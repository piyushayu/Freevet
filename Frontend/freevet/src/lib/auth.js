
import { supabase } from './supabase'

export async function signUpUser(email, password) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) return { data: null, error }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,       
      name: '',
      location: '',
      member_since: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    })
  }

  return { data, error: null }
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export function onAuthChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session)
    }
  )

  return subscription
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/profile`,
    },
  })

  return { data, error }
}

export async function sendPasswordResetEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { data, error }
}

export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  return { data, error }
}
