
-- Clear any incomplete profile data that might be causing issues
DELETE FROM public.profiles WHERE organization_id IS NULL OR first_name IS NULL OR last_name IS NULL;

-- Also clear any orphaned user roles that might exist without proper organization links
DELETE FROM public.user_roles WHERE organization_id NOT IN (SELECT id FROM public.organizations);

-- Clear any organizations that might have been created without proper completion
DELETE FROM public.organizations WHERE name IS NULL OR name = '';
