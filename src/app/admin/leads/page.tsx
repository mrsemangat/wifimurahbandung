'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Download, Eye, Edit2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  address?: string;
  location?: string;
  needType?: string;
  budget?: string;
  status: string;
  source?: string;
  notes?: string;
  createdAt: string;
  provider?: { id: string; name: string; slug: string };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  pending: 'bg-orange-100 text-orange-800 border-orange-200',
  deal: 'bg-green-100 text-green-800 border-green-200',
  cancel: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  pending: 'Pending',
  deal: 'Deal',
  cancel: 'Cancel',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  // Format WA number: remove leading 0, add 62 prefix
  const formatWaNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1)
    }
    if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned
    }
    return cleaned
  }

  const getFollowUpLink = (lead: Lead): string => {
    const phone = formatWaNumber(lead.whatsapp)
    const msg = encodeURIComponent(`Halo ${lead.name}, terima kasih sudah menghubungi Wifi Murah Bandung. Kami ingin membantu kebutuhan internet Anda.`)
    return `https://wa.me/${phone}?text=${msg}`
  }
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // View modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLead, setViewLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', '20');
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(data.data || []);
      if (data.pagination) setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, statusFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSearch(searchInput);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/leads/export?${params}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Export successful');
    } catch {
      toast.error('Failed to export leads');
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
    setEditOpen(true);
  };

  const handleView = (lead: Lead) => {
    setViewLead(lead);
    setViewOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editLead) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editLead.id, status: editStatus, notes: editNotes }),
      });
      if (!res.ok) throw new Error('Failed to update lead');
      toast.success('Lead updated successfully');
      setEditOpen(false);
      fetchLeads();
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-muted-foreground">Manage your incoming leads</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search name or WhatsApp..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="max-w-sm"
              />
              <Button onClick={handleSearch} size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPagination((p) => ({ ...p, page: 1 })); }}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="deal">Deal</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No leads found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">WhatsApp</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Location</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Need Type</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Budget</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Provider</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.whatsapp}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{lead.location || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{lead.needType || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{lead.budget || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{lead.provider?.name || '-'}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={cn('text-xs', statusColors[lead.status] || 'bg-gray-100 text-gray-800')}
                          variant="secondary"
                        >
                          {statusLabels[lead.status] || lead.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleView(lead)}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(lead)}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            asChild
                          >
                            <a href={getFollowUpLink(lead)} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {leads.length} of {pagination.total} leads
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-3 text-sm">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lead Detail</DialogTitle>
          </DialogHeader>
          {viewLead && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{viewLead.name}</span></div>
                <div><span className="text-muted-foreground">WhatsApp:</span> <span className="font-medium">{viewLead.whatsapp}</span></div>
                <div><span className="text-muted-foreground">Location:</span> <span className="font-medium">{viewLead.location || '-'}</span></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="font-medium">{viewLead.address || '-'}</span></div>
                <div><span className="text-muted-foreground">Need:</span> <span className="font-medium">{viewLead.needType || '-'}</span></div>
                <div><span className="text-muted-foreground">Budget:</span> <span className="font-medium">{viewLead.budget || '-'}</span></div>
                <div><span className="text-muted-foreground">Provider:</span> <span className="font-medium">{viewLead.provider?.name || '-'}</span></div>
                <div><span className="text-muted-foreground">Source:</span> <span className="font-medium">{viewLead.source || '-'}</span></div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>{' '}
                <Badge className={cn('text-xs', statusColors[viewLead.status])} variant="secondary">
                  {statusLabels[viewLead.status] || viewLead.status}
                </Badge>
              </div>
              {viewLead.notes && (
                <div>
                  <span className="text-muted-foreground">Notes:</span>
                  <p className="mt-1 rounded-md bg-muted p-2">{viewLead.notes}</p>
                </div>
              )}
              <div className="text-muted-foreground text-xs">
                Created: {new Date(viewLead.createdAt).toLocaleString('id-ID')}
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 mt-2"
                asChild
              >
                <a href={getFollowUpLink(viewLead)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Follow Up via WhatsApp
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          {editLead && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Lead</Label>
                <p className="text-sm font-medium">{editLead.name} - {editLead.whatsapp}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="deal">Deal</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes..."
                />
              </div>
              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="gap-2 text-green-600 border-green-200 hover:bg-green-50"
                  asChild
                >
                  <a href={getFollowUpLink(editLead)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    Follow Up WA
                  </a>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveEdit} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
