import { FC } from 'react'
import * as Icons from '@mui/icons-material'

export type IconNames = keyof typeof Icons
export type IconProps = {
  iconName: IconNames
}

export const IconComponent: FC<IconProps> = ({
  iconName,
}) => {
  const Icon = Icons[iconName]
  return <Icon />
}