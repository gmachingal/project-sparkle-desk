import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const holidayFormSchema = z.object({
  name: z.string().min(1, "Holiday name is required"),
  date: z.string().min(1, "Date is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().optional(),
});

const HolidayMaster = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const form = useForm<z.infer<typeof holidayFormSchema>>({
    resolver: zodResolver(holidayFormSchema),
    defaultValues: {
      name: "",
      date: "",
      type: "national",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof holidayFormSchema>) => {
    console.log(values);
    toast({
      title: "Holiday Added",
      description: "Holiday has been added to the organization calendar.",
    });
    setIsDialogOpen(false);
    form.reset();
  };

  // Generate years (current year and ±3 years)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({length: 7}, (_, i) => currentYear - 3 + i);

  // Mock holiday data - Calendar year based
  const holidays = [
    {
      id: 1,
      name: "New Year's Day",
      date: `${selectedYear}-01-01`,
      type: "national",
      description: "National holiday for the new year celebration"
    },
    {
      id: 2,
      name: "Republic Day",
      date: `${selectedYear}-01-26`,
      type: "national",
      description: "National holiday celebrating the constitution"
    },
    {
      id: 3,
      name: "Independence Day",
      date: `${selectedYear}-08-15`,
      type: "national",
      description: "National holiday celebrating independence"
    },
    {
      id: 4,
      name: "Company Foundation Day",
      date: `${selectedYear}-03-15`,
      type: "company",
      description: "Celebrating company's foundation anniversary"
    },
    {
      id: 5,
      name: "Diwali",
      date: `${selectedYear}-11-01`,
      type: "regional",
      description: "Festival of lights celebration"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-red-100 text-red-800 border-red-200";
      case "regional":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "company":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button Above Header */}
      <div className="border-b backdrop-blur-sm bg-gradient-to-r from-primary/50 via-primary-glow/40 to-primary/50 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 py-3">
           <Button variant="back" onClick={() => navigate('/leave-management')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leave Management
            </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
           
            <div>
              <h1 className="text-3xl font-bold text-foreground">Holiday Master</h1>
              <p className="text-muted-foreground mt-2">Manage organization holidays and observances for calendar year {selectedYear}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Holiday
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Holiday</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Holiday Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter holiday name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <select {...field} className="w-full px-3 py-2 border border-input rounded-md">
                                <option value="national">National</option>
                                <option value="regional">Regional</option>
                                <option value="company">Company</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter holiday description"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2 justify-end pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Holiday</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Organization Holidays - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Holiday Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell className="font-medium">{holiday.name}</TableCell>
                    <TableCell>{new Date(holiday.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(holiday.type)}>
                        {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {holiday.description || "No description"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HolidayMaster;