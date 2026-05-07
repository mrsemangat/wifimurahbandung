'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Popup {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  isActive: boolean;
  delay: number;
  scrollPos: number;
  showOnce: boolean;
}

const emptyForm = {
  type: 'delay' as string,
  title: '',
  subtitle: '',
  ctaText: '',
  ctaUrl: '',
  isActive: true,
  delay: 5,
  scrollPos: 50,
  showOnce: true,
};

const typeLabels: Record<string, string> = {
  delay: 'Delay',
  exit_intent: 'Exit Intent',
  scroll: 'Scroll',
};

export default function PopupsPage() {
  const [items, setItems] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Popup | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/popups');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to fetch popups'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };

  const handleEdit = (item: Popup) => {
    setEditing(item);
    setForm({
      type: item.type, title: item.title, subtitle: item.subtitle || '',
      ctaText: item.ctaText || '', ctaUrl: item.ctaUrl || '',
      isActive: item.isActive, delay: item.delay,
      scrollPos: item.scrollPos, showOnce: item.showOnce,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch('/api/admin/popups', {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? 'Popup updated' : 'Popup created');
      setDialogOpen(false);
      fetchData();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/popups?id=${deleteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Deleted');
      setDeleteId(null);
      fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Popups</h1>
          <p className="text-sm text-muted-foreground">Manage popup lead capture forms</p>
        </div>
        <Button onClick={handleAdd} className="gap-2"><Plus className="h-4 w-4" />Add Popup</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-16" /></div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No popups yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Subtitle</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">CTA</th>
                    <th className="px-4 py-3 font-medium">Active</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Delay</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">{typeLabels[item.type] || item.type}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium max-w-[200px] truncate">{item.title}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{item.subtitle || '-'}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.ctaText || '-'}</td>
                      <td className="px-4 py-3">
                        <Badge variant={item.isActive ? 'default' : 'secondary'} className="text-xs">
                          {item.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{item.delay}s</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}><Edit2 className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? 'Edit Popup' : 'Add Popup'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="delay">Delay</SelectItem>
                  <SelectItem value="exit_intent">Exit Intent</SelectItem>
                  <SelectItem value="scroll">Scroll</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
            <div className="space-y-2"><Label htmlFor="subtitle">Subtitle</Label><Input id="subtitle" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label htmlFor="ctaText">CTA Text</Label><Input id="ctaText" value={form.ctaText} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} /></div>
              <div className="space-y-2"><Label htmlFor="ctaUrl">CTA URL</Label><Input id="ctaUrl" value={form.ctaUrl} onChange={(e) => setForm((f) => ({ ...f, ctaUrl: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label htmlFor="delay">Delay (seconds)</Label><Input id="delay" type="number" value={form.delay} onChange={(e) => setForm((f) => ({ ...f, delay: parseInt(e.target.value) || 0 }))} /></div>
              <div className="space-y-2"><Label htmlFor="scrollPos">Scroll Position (%)</Label><Input id="scrollPos" type="number" value={form.scrollPos} onChange={(e) => setForm((f) => ({ ...f, scrollPos: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            <div className="flex items-center gap-3"><Switch checked={form.isActive} onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))} /><Label>Active</Label></div>
            <div className="flex items-center gap-3"><Switch checked={form.showOnce} onCheckedChange={(v) => setForm((f) => ({ ...f, showOnce: v }))} /><Label>Show Once Per Session</Label></div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Popup</AlertDialogTitle><AlertDialogDescription>Are you sure? This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
