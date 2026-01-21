import type { ReactNode } from 'react'
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native'
// @ts-ignore: react-native has no declaration file in this environment
import { View, ActivityIndicator } from 'react-native'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <NativeRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </NativeRouter>
    </AuthProvider>
  )
}
