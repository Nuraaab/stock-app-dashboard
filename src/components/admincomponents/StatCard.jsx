import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatCard = ({ cash, transfer, credit, expense, netIncome, title, isSale, isExpense, isNet }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 console.log('isSale' + isSale);
  return (
    <Box width="100%" m="0 30px" padding={0}>
      <Box display="flex" justifyContent="center">
        <Box>
        <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100], marginRight: '10px', mb:'4px' }}
          >
           {title}
          </Typography>
        {isSale && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
        <Typography
                variant="h5"
                sx={{ color: colors.grey[200] , ml:'5px', fontFamily: 'Roboto', fontSize:"15px"}}
            >
                In Cash:
                </Typography>
            <Typography
                variant="h6"
                fontWeight="bold"
                
                sx={{ color: colors.grey[100] , ml:'5px', fontFamily: 'Roboto'}}
            >
                {cash} Br
            </Typography>
            </Box>}
           {isSale && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
           <Typography
                variant="h5"
                sx={{ color: colors.grey[200] , ml:'5px', fontFamily: 'Roboto', fontSize:"15px"}}
            > 
                In Transfer:
                </Typography>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100] , ml:'5px'}}
            >
                {transfer} Br
            </Typography>
            </Box>}
           { isSale && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
           <Typography
                variant="h5"
                sx={{ color: colors.grey[200] , ml:'5px', fontFamily: 'Roboto', fontSize:"15px"}}
            >
                In Credit:
                </Typography>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
                style={{marginLeft:'10px'}}
            >
                {credit} Br
            </Typography>
            </Box>}
            {isExpense && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100] , ml:'5px'}}
            >
                {expense} Br
            </Typography>
            </Box>}
            {isNet && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100] , ml:'5px'}}
            >
                {netIncome} Br
            </Typography>
            </Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default StatCard;
