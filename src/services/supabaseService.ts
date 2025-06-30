import { supabase } from '@/lib/supabaseClient';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase
    .from('v0001_student_database')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error) throw error;
  return data;
}

export async function signUp(profile: any) {
  const { data, error } = await supabase
    .from('v0001_student_database')
    .insert([profile])
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentProfile(student_id: string) {
  const { data, error } = await supabase
    .from('v0001_student_database')
    .select('*')
    .eq('student_id', student_id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllEmailPasswordPairs() {
  const { data, error } = await supabase
    .from('v0001_student_database')
    .select('email, password');
  if (error) throw error;
  return data;
} 