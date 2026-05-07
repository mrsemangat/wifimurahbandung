'use client';

import React, { useState, useEffect } from 'react';
import { Save, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface SeoSetting {
  id: string;
  page: string;
  metaTitle?: string;
  metaDesc?: string;
  focusKeyword?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const pageLabels: Record<string, string> = {
  home: 'Home Page',
  blog: 'Blog Page',
  faq: 'FAQ Page',
  about: 'About Page',
  contact: 'Contact Page',
};

export default function SeoPage() {
  const [settings, setSettings] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newPageName, setNewPageName] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/seo');
        const data = await res.json();
        setSettings(Array.isArray(data) ? data : []);
      } catch { toast.error('Failed to fetch SEO settings'); }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const getSetting = (page: string) => settings.find((s) => s.page === page);

  const updateField = (page: string, field: string, value: string) => {
    setSettings((prev) => {
      const existing = prev.find((s) => s.page === page);
      if (existing) {
        return prev.map((s) => s.page === page ? { ...s, [field]: value } : s);
      }
      return [...prev, { id: '', page, [field]: value }];
    });
  };

  const handleSave = async (page: string) => {
    const setting = getSetting(page);
    if (!setting) return;
    setSaving(page);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          metaTitle: setting.metaTitle || '',
          metaDesc: setting.metaDesc || '',
          focusKeyword: setting.focusKeyword || '',
          ogImage: setting.ogImage || '',
          canonicalUrl: setting.canonicalUrl || '',
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(`SEO settings for "${page}" saved`);
    } catch {
      toast.error('Failed to save SEO settings');
    } finally {
      setSaving(null);
    }
  };

  const handleAddPage = () => {
    if (!newPageName.trim()) return;
    const slug = newPageName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
    if (settings.find((s) => s.page === slug)) {
      toast.error('Page already exists');
      return;
    }
    setSettings((prev) => [...prev, { id: '', page: slug }]);
    setNewPageName('');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">SEO Settings</h1>
          <p className="text-sm text-muted-foreground">Manage meta tags and SEO for each page</p>
        </div>
      </div>

      {/* Add new page */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="New page name (e.g. about, services)"
              onKeyDown={(e) => e.key === 'Enter' && handleAddPage()}
            />
            <Button onClick={handleAddPage} variant="outline">Add Page</Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings for each page */}
      <div className="space-y-4">
        {settings.map((setting) => (
          <Card key={setting.page}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  {pageLabels[setting.page] || setting.page}
                </CardTitle>
                <Button
                  onClick={() => handleSave(setting.page)}
                  disabled={saving === setting.page}
                  size="sm"
                  className="gap-2"
                >
                  <Save className="h-3.5 w-3.5" />
                  {saving === setting.page ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={setting.metaTitle || ''}
                    onChange={(e) => updateField(setting.page, 'metaTitle', e.target.value)}
                    placeholder="Meta title..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Focus Keyword</Label>
                  <Input
                    value={setting.focusKeyword || ''}
                    onChange={(e) => updateField(setting.page, 'focusKeyword', e.target.value)}
                    placeholder="Focus keyword..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={setting.metaDesc || ''}
                  onChange={(e) => updateField(setting.page, 'metaDesc', e.target.value)}
                  rows={2}
                  placeholder="Meta description..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>OG Image URL</Label>
                  <Input
                    value={setting.ogImage || ''}
                    onChange={(e) => updateField(setting.page, 'ogImage', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input
                    value={setting.canonicalUrl || ''}
                    onChange={(e) => updateField(setting.page, 'canonicalUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
