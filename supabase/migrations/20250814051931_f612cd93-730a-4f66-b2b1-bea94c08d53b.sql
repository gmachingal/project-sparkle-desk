-- Create master table for organization sizes
CREATE TABLE public.organization_sizes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create master table for industries
CREATE TABLE public.industries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default organization sizes
INSERT INTO public.organization_sizes (name, display_order) VALUES
  ('1-10 employees', 1),
  ('11-50 employees', 2),
  ('51-200 employees', 3),
  ('201-500 employees', 4),
  ('500+ employees', 5);

-- Insert default industries
INSERT INTO public.industries (name, display_order) VALUES
  ('Technology', 1),
  ('Healthcare', 2),
  ('Finance', 3),
  ('Education', 4),
  ('Manufacturing', 5),
  ('Retail', 6),
  ('Other', 7);

-- Enable RLS (these are reference data, can be read by everyone)
ALTER TABLE public.organization_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

-- Create policies for reading reference data
CREATE POLICY "Anyone can read organization sizes" 
ON public.organization_sizes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read industries" 
ON public.industries 
FOR SELECT 
USING (true);