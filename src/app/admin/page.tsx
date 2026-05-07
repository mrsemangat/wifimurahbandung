'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserPlus, Handshake, Wifi, ArrowRight, Plus, Eye, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  location?: string;
  needType?: string;
  status: string;
  createdAt: string;
  provider?: { name: string };
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  dealsClosed: number;
  activeProviders: number;
  leadsThisMonth: number;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-orange-100 text-orange-800',
  deal: 'bg-green-100 text-green-800',
  cancel: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, providersRes] = await Promise.all([
          fetch('/api/admin/leads?limit=5&page=1'),
          fetch('/api/admin/providers'),
        ]);

        const leadsData = await leadsRes.json();
        const providers = await providersRes.json();

        const allLeads = leadsData.data || [];
        const pagination = leadsData.pagination || { total: 0 };

        setStats({
          totalLeads: pagination.total,
          newLeads: allLeads.filter((l: Lead) => l.status === 'new').length,
          dealsClosed: allLeads.filter((l: Lead) => l.status === 'deal').length,
          activeProviders: Array.isArray(providers) ? providers.filter((p: { isActive: boolean }) => p.isActive).length : 0,
          leadsThisMonth: 0,
        });
        setRecentLeads(allLeads);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads ?? 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      subtitle: stats ? `+${stats.leadsThisMonth} this month` : undefined,
    },
    {
      title: 'New Leads',
      value: stats?.newLeads ?? 0,
      icon: UserPlus,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      subtitle: 'Status: New',
    },
    {
      title: 'Deals Closed',
      value: stats?.dealsClosed ?? 0,
      icon: Handshake,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subtitle: 'Converted leads',
    },
    {
      title: 'Active Providers',
      value: stats?.activeProviders ?? 0,
      icon: Wifi,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      subtitle: 'Partner providers',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : statCards.map((card) => (
              <Card key={card.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-2xl font-bold">{card.value}</p>
                      {card.subtitle && (
                        <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <Link href="/admin/leads">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No leads yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">WhatsApp</th>
                      <th className="pb-2 font-medium hidden sm:table-cell">Location</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b last:border-0">
                        <td className="py-2.5 font-medium">{lead.name}</td>
                        <td className="py-2.5 text-muted-foreground">{lead.whatsapp}</td>
                        <td className="py-2.5 text-muted-foreground hidden sm:table-cell">{lead.location || '-'}</td>
                        <td className="py-2.5">
                          <Badge
                            className={cn(
                              'text-xs',
                              statusColors[lead.status] || 'bg-gray-100 text-gray-800'
                            )}
                            variant="secondary"
                          >
                            {lead.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/providers" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Add Provider
              </Button>
            </Link>
            <Link href="/admin/leads" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Eye className="h-4 w-4" />
                View Leads
              </Button>
            </Link>
            <Link href="/admin/faqs" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <HelpCircle className="h-4 w-4" />
                Manage FAQs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
