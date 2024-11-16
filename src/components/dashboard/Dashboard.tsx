import { Alert, Box, Button, Container, Paper, Typography } from "@mui/material"
import { StatsCard } from "./StatsCard"
import { Award, DollarSign, Package2, ShoppingCart } from "lucide-react"
import { PerformanceChart } from "./PerformanceChart"
import { TopPages } from "./TopPages"
import { RecentOrders } from "./RecentOrders"
import { Grid } from "@mui/material"

export const Dashboard = () => <article>

    <Box className="min-h-screen bg-gray-50">
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={4}>
                {/* Alert */}
                <Grid item >
                    <Alert severity="warning" className="mb-4">
                        We regret to inform you that our server is currently experiencing technical difficulties.
                    </Alert>

                    {/* Stats Cards */}
                    <Grid container spacing={3}>
                        {[
                            { title: 'Total Orders', value: '13,647', icon: <ShoppingCart />, change: '+2.3%', period: 'Last Week' },
                            { title: 'New Leads', value: '9,526', icon: <Award />, change: '+8.1%', period: 'Last Month' },
                            { title: 'Deals', value: '976', icon: <Package2 />, change: '-0.3%', period: 'Last Month', negative: true },
                            { title: 'Booked Revenue', value: '$123.6k', icon: <DollarSign />, change: '-10.6%', period: 'Last Month', negative: true }
                        ].map((stat, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <StatsCard {...stat} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Performance Chart */}
                <Grid item >
                    <Paper className="p-6">
                        <Box className="flex justify-between items-center mb-6">
                            <Typography variant="h6">Performance</Typography>
                            <Box className="space-x-2">
                                {['ALL', '1M', '6M', '1Y'].map((period, index) => (
                                    <Button
                                        key={period}
                                        variant="outlined"
                                        size="small"
                                        className={index === 3 ? 'bg-primary-50' : ''}
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                        <PerformanceChart />
                    </Paper>
                </Grid>

                {/* Top Pages */}
                <Grid item xs={12} lg={4}>
                    <TopPages />
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                    <RecentOrders />
                </Grid>
            </Grid>
        </Container>
    </Box>

</article>