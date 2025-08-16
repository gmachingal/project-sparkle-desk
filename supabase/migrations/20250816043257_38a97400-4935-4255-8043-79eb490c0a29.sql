-- Add RLS policy to allow authenticated users to create organizations
CREATE POLICY "Users can create organizations" 
ON public.organizations 
FOR INSERT 
TO authenticated
WITH CHECK (true);