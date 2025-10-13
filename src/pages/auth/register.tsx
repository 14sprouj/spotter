import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-native'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else navigate('/')
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => navigate('/login')} />
    </View>
  )
}
