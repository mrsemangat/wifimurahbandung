'use client';

import React, { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface SettingItem {
  id: string;
  key: string;
  value: string;
  group: string;
}

type GroupedSettings = Record<string, SettingItem[]>;

const groupLabels: Record<string, string> = {
  general: 'General',
  contact: 'Contact',
  hero: 'Hero Section',
  promo: 'Promo',
  popup: 'Popup',
  notification: 'Notification',
};

const groupDescriptions: Record<string, string> = {
  general: 'General website settings',
  contact: 'Contact information',
  hero: 'Hero section configuration',
  promo: 'Promotional settings',
  popup: 'Popup behavior settings',
  notification: 'Notification display settings',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        setSettings(typeof data === 'object' && !Array.isArray(data) ? data : {});
      } catch { toast.error('Failed to fetch settings'); }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const updateValue = (group: string, key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [group]: (prev[group] || []).map((s) => s.key === key ? { ...s, value } : s),
    }));
  };

  const handleSaveGroup = async (group: string) => {
    const groupSettings = settings[group];
    if (!groupSettings) return;
    setSaving(group);
    try {
      // Save each setting in the group
      await Promise.all(
        groupSettings.map((s) =>
          fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: s.key, value: s.value }),
          })
        )
      );
      toast.success(`Settings for "${groupLabels[group] || group}" saved`);
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
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

  const groups = Object.keys(settings);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage general website settings</p>
      </div>

      {groups.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No settings configured yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Card key={group}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      {groupLabels[group] || group}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {groupDescriptions[group] || `${group} settings`}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleSaveGroup(group)}
                    disabled={saving === group}
                    size="sm"
                    className="gap-2"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {saving === group ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {settings[group].map((setting) => (
                    <div key={setting.key} className="space-y-1.5">
                      <Label htmlFor={setting.key} className="text-sm">
                        {setting.key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).replace(/_/g, ' ')}
                      </Label>
                      <Input
                        id={setting.key}
                        value={setting.value}
                        onChange={(e) => updateValue(group, setting.key, e.target.value)}
                        placeholder={setting.key}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
