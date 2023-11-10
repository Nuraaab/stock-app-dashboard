import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatCard = ({ cash, transfer, credit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="center">
        <Box>
        <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            Today's Sale
          </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                In Cash:
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
            >
                {cash}
            </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                In Transfer:
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
            >
                {transfer}
            </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
           
                In Credit:
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
            >
                {credit}
            </Typography>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StatCard;
