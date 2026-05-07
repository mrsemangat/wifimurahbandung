'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2, UserCog, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

const roleColors: Record<string, string> = {
  admin: 'bg-blue-100 text-blue-800 border-blue-200',
  superadmin: 'bg-purple-100 text-purple-800 border-purple-200',
  editor: 'bg-green-100 text-green-800 border-green-200',
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formRole, setFormRole] = useState('admin')

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.data || [])
    } catch {
      toast.error('Gagal memuat data user')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const openCreate = () => {
    setEditingUser(null)
    setFormName('')
    setFormEmail('')
    setFormPassword('')
    setFormRole('admin')
    setDialogOpen(true)
  }

  const openEdit = (user: AdminUser) => {
    setEditingUser(user)
    setFormName(user.name)
    setFormEmail(user.email)
    setFormPassword('')
    setFormRole(user.role)
    setDialogOpen(true)
  }

  const openDelete = (user: AdminUser) => {
    setDeletingUser(user)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    if (!formName || !formEmail) {
      toast.error('Nama dan email wajib diisi')
      return
    }
    if (!editingUser && !formPassword) {
      toast.error('Password wajib diisi untuk user baru')
      return
    }

    setSaving(true)
    try {
      if (editingUser) {
        const body: Record<string, string> = {
          id: editingUser.id,
          name: formName,
          email: formEmail,
          role: formRole,
        }
        if (formPassword) body.password = formPassword

        const res = await fetch('/api/admin/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal mengupdate user')
        }
        toast.success('User berhasil diupdate')
      } else {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            password: formPassword,
            role: formRole,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal membuat user')
        }
        toast.success('User berhasil ditambahkan')
      }
      setDialogOpen(false)
      fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingUser) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/users?id=${deletingUser.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Gagal menghapus user')
      }
      toast.success('User berhasil dihapus')
      setDeleteOpen(false)
      fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserCog className="size-6" />
            Pengguna Admin
          </h1>
          <p className="text-sm text-muted-foreground">Kelola akun pengguna admin</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Tambah User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              Belum ada user admin
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Nama</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Dibuat</th>
                    <th className="px-4 py-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={cn('text-xs', roleColors[user.role] || 'bg-gray-100 text-gray-800')}
                          variant="secondary"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(user)}>
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => openDelete(user)}
                          >
                            <Trash2 className="size-3.5" />
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Nama</Label>
              <Input
                id="user-name"
                placeholder="Nama lengkap"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="email@contoh.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-password">
                Password {editingUser && <span className="text-muted-foreground font-normal">(kosongkan jika tidak diubah)</span>}
              </Label>
              <Input
                id="user-password"
                type="password"
                placeholder={editingUser ? '••••••••' : 'Minimal 6 karakter'}
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role">Role</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger id="user-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editingUser ? 'Simpan' : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus User</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Yakin ingin menghapus user <strong>{deletingUser?.name}</strong> ({deletingUser?.email})? Aksi ini tidak dapat dibatalkan.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
