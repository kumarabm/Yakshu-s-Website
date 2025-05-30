import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Dress, type AdminUser } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Edit } from "lucide-react";

export default function Admin() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [dressForm, setDressForm] = useState({
    name: "",
    price: "",
    sizes: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    image: null as File | null,
  });

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [editingDress, setEditingDress] = useState<Dress | null>(null);
  const [editDressForm, setEditDressForm] = useState({
    name: "",
    price: "",
    sizes: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    image: null as File | null,
  });

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setLocation("/");
        return;
      }

      try {
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          setLocation("/");
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setLocation("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setLocation]);

  // Queries
  const { data: dresses, isLoading: dressesLoading } = useQuery<Dress[]>({
    queryKey: ["/api/dresses"],
    enabled: isAuthenticated,
  });

  const { data: adminUsers, isLoading: adminUsersLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch admin users");
      return response.json();
    },
  });

  // Mutations
  const addDressMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/dresses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add dress");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
      setDressForm({
        name: "",
        price: "",
        sizes: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        image: null,
      });
      toast({
        title: "Success",
        description: "Dress added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteDressMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/dresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete dress");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
      toast({
        title: "Success",
        description: "Dress deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addAdminMutation = useMutation({
    mutationFn: async (adminData: typeof adminForm) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminData),
      });
      if (!response.ok) throw new Error("Failed to add admin user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setAdminForm({
        name: "",
        email: "",
        password: "",
        role: "admin",
      });
      toast({
        title: "Success",
        description: "Admin user added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete admin user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "Admin user deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const editDressMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/dresses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update dress");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dresses"] });
      setEditingDress(null);
      setEditDressForm({
        name: "",
        price: "",
        sizes: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        image: null,
      });
      toast({
        title: "Success",
        description: "Dress updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEditDress = (dress: Dress) => {
    setEditingDress(dress);
    setEditDressForm({
      name: dress.name,
      price: dress.price.toString(),
      sizes: dress.sizes.join(", "),
      shortDescription: dress.shortDescription,
      fullDescription: dress.fullDescription,
      category: dress.category,
      image: null,
    });
  };

  const handleDressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dressForm.name || !dressForm.price || !dressForm.sizes || !dressForm.shortDescription || 
        !dressForm.fullDescription || !dressForm.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", dressForm.name);
    formData.append("price", dressForm.price);
    formData.append("sizes", dressForm.sizes);
    formData.append("shortDescription", dressForm.shortDescription);
    formData.append("fullDescription", dressForm.fullDescription);
    formData.append("category", dressForm.category);

    if (dressForm.image) {
      formData.append("image", dressForm.image);
    }

    addDressMutation.mutate(formData);
  };

  const handleEditDressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingDress || !editDressForm.name || !editDressForm.price || !editDressForm.sizes || 
        !editDressForm.shortDescription || !editDressForm.fullDescription || !editDressForm.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", editDressForm.name);
    formData.append("price", editDressForm.price);
    formData.append("sizes", editDressForm.sizes);
    formData.append("shortDescription", editDressForm.shortDescription);
    formData.append("fullDescription", editDressForm.fullDescription);
    formData.append("category", editDressForm.category);

    if (editDressForm.image) {
      formData.append("image", editDressForm.image);
    }

    editDressMutation.mutate({ id: editingDress._id || editingDress.id, formData });
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addAdminMutation.mutate(adminForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setLocation("/");
  };

  const handleDeleteDress = (id: string) => {
    if (confirm(t("confirmDelete"))) {
      deleteDressMutation.mutate(id);
    }
  };

  const handleDeleteAdmin = (id: string) => {
    if (confirm(t("confirmDelete"))) {
      deleteAdminMutation.mutate(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-boutique-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Yakshu Boutique - {t("adminPanel")}
            </h1>
            <Button
              onClick={handleLogout}
              variant="destructive"
            >
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="dresses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dresses">{t("dressManagement")}</TabsTrigger>
            <TabsTrigger value="users">{t("userManagement")}</TabsTrigger>
          </TabsList>

          {/* Dress Management */}
          <TabsContent value="dresses" className="space-y-8">
            {/* Add New Dress */}
            <Card>
              <CardHeader>
                <CardTitle>{t("addNewDress")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDressSubmit} className="space-y-4">
                  <div className="admin-form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dressName">{t("dressName")}</Label>
                      <Input
                        id="dressName"
                        value={dressForm.name}
                        onChange={(e) => setDressForm({ ...dressForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">{t("price")} (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={dressForm.price}
                        onChange={(e) => setDressForm({ ...dressForm, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sizes">{t("sizes")}</Label>
                      <Input
                        id="sizes"
                        placeholder="e.g., S, M, L, XL"
                        value={dressForm.sizes}
                        onChange={(e) => setDressForm({ ...dressForm, sizes: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">{t("category")}</Label>
                      <Select value={dressForm.category} onValueChange={(value) => setDressForm({ ...dressForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="evening_wear">{t("eveningWear")}</SelectItem>
                          <SelectItem value="casual">{t("casual")}</SelectItem>
                          <SelectItem value="formal">{t("formal")}</SelectItem>
                          <SelectItem value="party_wear">{t("partyWear")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">{t("shortDescription")}</Label>
                    <Input
                      id="shortDescription"
                      value={dressForm.shortDescription}
                      onChange={(e) => setDressForm({ ...dressForm, shortDescription: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fullDescription">{t("fullDescription")}</Label>
                    <Textarea
                      id="fullDescription"
                      rows={3}
                      value={dressForm.fullDescription}
                      onChange={(e) => setDressForm({ ...dressForm, fullDescription: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">{t("dressImage")}</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setDressForm({ ...dressForm, image: e.target.files?.[0] || null })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-boutique-500 hover:bg-boutique-600"
                    disabled={addDressMutation.isPending}
                  >
                    {addDressMutation.isPending ? "Adding..." : t("add")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Dresses */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Existing Dresses</CardTitle>
              </CardHeader>
              <CardContent>
                {dressesLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Skeleton className="w-16 h-16 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-1/3 mb-2" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : dresses && dresses.length > 0 ? (
                  <div className="space-y-4">
                    {dresses.map((dress) => (
                      <div key={dress.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={dress.imageUrl}
                            alt={dress.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{dress.name}</h4>
                            <p className="text-sm text-gray-600">₹{dress.price}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEditDress(dress)}
                          >
                            <Edit size={16} className="mr-1" />
                            {t("edit")}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteDress(dress._id || dress.id)}
                            disabled={deleteDressMutation.isPending}
                          >
                            <Trash2 size={16} className="mr-1" />
                            {t("delete")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No dresses found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-8">
            {/* Add New Admin */}
            <Card>
              <CardHeader>
                <CardTitle>{t("addNewAdmin")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adminName">{t("name")}</Label>
                      <Input
                        id="adminName"
                        value={adminForm.name}
                        onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminEmail">{t("email")}</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminPassword">{t("password")}</Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminRole">{t("role")}</Label>
                      <Select value={adminForm.role} onValueChange={(value) => setAdminForm({ ...adminForm, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super_admin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-boutique-500 hover:bg-boutique-600"
                    disabled={addAdminMutation.isPending}
                  >
                    {addAdminMutation.isPending ? "Adding..." : t("add")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Admin Users */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Admin Users</CardTitle>
              </CardHeader>
              <CardContent>
                {adminUsersLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : adminUsers && adminUsers.length > 0 ? (
                  <div className="space-y-4">
                    {adminUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <span className="inline-block px-2 py-1 text-xs bg-boutique-100 text-boutique-800 rounded-full">
                            {user.role}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <Edit size={16} className="mr-1" />
                            {t("edit")}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteAdmin(user.id)}
                            disabled={deleteAdminMutation.isPending}
                          >
                            <Trash2 size={16} className="mr-1" />
                            {t("delete")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No admin users found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dress Modal */}
      <Dialog open={!!editingDress} onOpenChange={() => setEditingDress(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Dress</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditDressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editDressName">{t("dressName")}</Label>
                <Input
                  id="editDressName"
                  value={editDressForm.name}
                  onChange={(e) => setEditDressForm({ ...editDressForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editPrice">{t("price")} (₹)</Label>
                <Input
                  id="editPrice"
                  type="number"
                  value={editDressForm.price}
                  onChange={(e) => setEditDressForm({ ...editDressForm, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editSizes">{t("sizes")}</Label>
                <Input
                  id="editSizes"
                  placeholder="e.g., S, M, L, XL"
                  value={editDressForm.sizes}
                  onChange={(e) => setEditDressForm({ ...editDressForm, sizes: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editCategory">{t("category")}</Label>
                <Select value={editDressForm.category} onValueChange={(value) => setEditDressForm({ ...editDressForm, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evening_wear">{t("eveningWear")}</SelectItem>
                    <SelectItem value="casual">{t("casual")}</SelectItem>
                    <SelectItem value="formal">{t("formal")}</SelectItem>
                    <SelectItem value="party_wear">{t("partyWear")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="editShortDescription">{t("shortDescription")}</Label>
              <Input
                id="editShortDescription"
                value={editDressForm.shortDescription}
                onChange={(e) => setEditDressForm({ ...editDressForm, shortDescription: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="editFullDescription">{t("fullDescription")}</Label>
              <Textarea
                id="editFullDescription"
                rows={3}
                value={editDressForm.fullDescription}
                onChange={(e) => setEditDressForm({ ...editDressForm, fullDescription: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="editImage">{t("dressImage")} (optional)</Label>
              <Input
                id="editImage"
                type="file"
                accept="image/*"
                onChange={(e) => setEditDressForm({ ...editDressForm, image: e.target.files?.[0] || null })}
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="bg-boutique-500 hover:bg-boutique-600"
                disabled={editDressMutation.isPending}
              >
                {editDressMutation.isPending ? "Updating..." : "Update Dress"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingDress(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}