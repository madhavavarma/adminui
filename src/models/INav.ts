import * as Icons from '@mui/icons-material'

export interface INav {
    id: number;
    name: string;
    navigateTo?: string
    children?: INav[]
    showChildren?: boolean
    iconName?: keyof typeof Icons
    isActive: boolean
}