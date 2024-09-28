import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

export const GetIcon = (iconName: string, color: string) => {
    switch(iconName.toUpperCase()) {
        case 'DASHBOARD':
            return <DashboardIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'VISIBILITY':
            return <VisibilityIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'EDIT':
            return <EditIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'DELETE':
            return <DeleteIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'SHOPPINGBAG':
            return <ShoppingBagIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'CATEGORY':
            return <CategoryIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'LOCALOFFER':
            return <LocalOfferIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'VIEWCAROUSEL':
            return <ViewCarouselIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'SHOPPINGCART':
            return <ShoppingCartIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'ACCOUNTCIRCLE':
            return <AccountCircleIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'GROUP':
            return <GroupIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'SECURITY':
            return <SecurityIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'PEOPLE':
            return <PeopleIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'BUSINESS':
            return <BusinessIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'STAR':
            return <StarIcon sx= {{color: color ? `var(${color})` : ""}}/>
        case 'SEARCH':
            return <SearchIcon sx= {{color: color ? `var(${color})` : ""}}/>
        default:
            return <ErrorIcon sx= {{color: color ? `var(${color})` : ""}} />
    }
}