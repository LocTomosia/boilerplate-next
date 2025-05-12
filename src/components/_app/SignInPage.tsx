import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import dynamic from 'next/dynamic'

const InputAdornment = dynamic(() => import('@mui/material/InputAdornment'), { ssr: false })
const IconButton = dynamic(() => import('@mui/material/IconButton'), { ssr: false })

import { Box, Typography, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MarketingButton } from '@/components/common/MarketingButton'
import { SigninSignupContent } from './SigninSignupContent'
import { loginApi } from '@/requests/api/auth.api'
import { useSnackbar } from "@/hooks/useSnackbar";

type Props = {
  onSignIn: () => void
  error?: boolean
}

type FieldValues = { username: string; password: string }

export const SignInPage: React.FC<Props> = ({ onSignIn, error }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({ defaultValues: { username: '', password: '' } })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { openSnackbar } = useSnackbar()
  useEffect(() => {
    setIsClient(true)
  }, [])

  const onSubmit = async (data: FieldValues) => {
    const loginData = await loginApi.login(data)
    if (loginData.accessToken) {
      localStorage.setItem('token', loginData.accessToken);
      openSnackbar({ severity: "success", text: "Signed in successfully" });
      onSignIn();
    } else {
      openSnackbar({ severity: "error", text: "Token not found in response" });
    }
  }

  return (
    <SigninSignupContent>
      <form style={{ height: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="stretch" minHeight="100%" justifyContent="center">
          <Box sx={{ height: { xs: 50, md: 72, sm: 50 } }} />
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', px: 4, wordBreak: 'keep-all' }}>
            Login
          </Typography>
          <Box height={32} />
          <Box width="60%" alignSelf="center" display="flex" flexDirection="column" alignItems="stretch">
            <Box height={8} />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  variant="outlined"
                  error={!!errors.username}
                  label={<Typography variant="caption">Username</Typography>}
                  fullWidth
                  helperText={errors.username?.message}
                  {...field}
                  slotProps={{
                    input: {
                      'aria-label': 'username'
                    }
                  }}
                />
              )}
            />
            <Box height={12} />
            <Controller
              name="password"
              rules={{
                required: 'password required'
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors.password}
                  type={isPasswordVisible ? 'text' : 'password'}
                  fullWidth
                  helperText={errors.password?.message}
                  label={<Typography variant="caption">Password</Typography>}
                  slotProps={{
                    input: {
                      endAdornment: isClient ? (
                        <InputAdornment position="end">
                          <IconButton
                            name="password-visibility"
                            aria-label="パスワード表示/非表示"
                            size="small"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                      'aria-label': 'password'
                    }
                  }}
                  {...field}
                />
              )}
            />
            <Box height={16} />

            <MarketingButton
              name="signin"
              aria-label="Login"
              kind="primary"
              type="submit"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </MarketingButton>

            <Box height={10} />

            <MarketingButton kind="weak">Forgot password?</MarketingButton>

            <Box height={28} />
          </Box>
        </Box>
      </form>
    </SigninSignupContent>
  )
}
