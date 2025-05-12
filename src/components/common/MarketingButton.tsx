import { Box, Button, CircularProgress } from '@mui/material'
import { ButtonProps } from '@mui/material/Button/Button'
import { useRef } from 'react'
import { theme } from '@/utils'

export const MarketingButtonKind = {
  Primary: 'primary',
  PrimaryOutline: 'primary_outline',
  Secondary: 'secondary',
  Normal: 'normal',
  NormalOutline: 'normal_outline',
  Weak: 'weak',
  WeakSecondary: 'weak-secondary',
  Line: 'line',
  LineSecondary: 'line-secondary',
  EmphasisYellow: 'emphasis-yellow',
} as const

export type MarketingButtonKind =
  typeof MarketingButtonKind[keyof typeof MarketingButtonKind]

const Kind = {
  [MarketingButtonKind.Primary]: {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '8px',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    fontWeight: 700,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.PrimaryOutline]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#00000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: theme.palette.primary.main,
    borderWidth: 1,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '8px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#00000000',
    },
    '&.Mui-disabled': {
      color: theme.palette.primary.main,
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.Secondary]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#00000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: theme.palette.primary.main,
    borderWidth: 1,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '8px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#00000000',
    },
    '&.Mui-disabled': {
      color: theme.palette.primary.main,
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.Normal]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#636363',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#838383',
    },
    '&.Mui-disabled': {
      color: '#fff',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.NormalOutline]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#00000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#444444',
    borderWidth: 1,
    border: '1px solid',
    borderColor: '#838383',
    borderRadius: '8px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#00000000',
    },
    '&.Mui-disabled': {
      color: '#444444',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.Weak]: {
    boxShadow: 'none',
    backgroundColor: '#00000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#A3A3A3',
    fontWeight: 700,
    fontSize: '90%',
    letterSpacing: 0.1,
    '&:hover': {
      backgroundColor: '#20000000',
    },
    '&.Mui-disabled': {
      color: '#A3A3A3',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.WeakSecondary]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#00000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#636363',
    borderWidth: 1,
    border: '1px solid',
    borderColor: '#A3A3A3',
    fontWeight: 700,
    fontSize: '90%',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#00000000',
    },
    '&.Mui-disabled': {
      color: '#636363',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.Line]: {
    boxShadow: theme.shadows[2],
    backgroundColor: '#00B900',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#00B900',
    },
    '&.Mui-disabled': {
      color: '#fff',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.LineSecondary]: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#000000',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#00B900',
    borderWidth: 1,
    border: '1px solid',
    borderColor: '#00B900',
    borderRadius: '8px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#000000',
    },
    '&.Mui-disabled': {
      color: '#00B900',
      opacity: 0.6,
    },
  },
  [MarketingButtonKind.EmphasisYellow]: {
    boxShadow: theme.shadows[2],
    backgroundColor: '#ffd100',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#000',
    borderRadius: '8px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#ffd100',
    },
    '&.Mui-disabled': {
      color: '#000',
      opacity: 0.6,
    },
  },
}

interface MarketingButtonProps {
  kind?: MarketingButtonKind
  selected?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any> | any
}

// onClickは非同期関数を渡せるように独自定義
// color, variantはkindで代替
type OmittedButtonProps = Omit<ButtonProps, 'onClick' | 'color' | 'variant'>

export const MarketingButton = (
  props: MarketingButtonProps & OmittedButtonProps,
) => {
  const { kind, onClick, loading, children, ...buttonProps } = props

  const working = useRef(false)

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (working.current) {
      // ボタンの処理が終わっていないのでクリックイベントを無視する
      return
    }

    working.current = true

    await onClick?.(event)

    working.current = false
  }

  const Progress = () => (
    <CircularProgress
      size={24.4}
      color='inherit'
      sx={{ position: 'absolute' }}
    />
  )
  const sxStyle = Kind[kind ?? MarketingButtonKind.Normal]

  return (
    <Button
      {...buttonProps}
      onClick={loading ? undefined : handleClick}
      sx={[
        loading ? { position: 'relative', opacity: 0.8, ...sxStyle } : sxStyle,
        // 複数の形式があるsx propをcombineするのに配列形式が最適だが、
        // 型定義上undefined不可かつ、ネストが出来ないためのworkaround
        ...[props.sx ?? false].flat(),
      ]}
      tabIndex={loading ? -1 : undefined}
      aria-disabled={loading}
    >
      {loading ? <Progress /> : null}
      <Box display='flex' overflow='hidden' textOverflow='ellipsis'>
        {children}
      </Box>
    </Button>
  )
}
