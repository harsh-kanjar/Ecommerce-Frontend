
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';;
import SendIcon from '@mui/icons-material/Send';
import ReportIcon from '@mui/icons-material/Report';
import RateReviewIcon from '@mui/icons-material/RateReview';
const actions = [
  { icon: <ReportIcon />, name: 'Report' },
  { icon: < RateReviewIcon/>, name: 'Feedback' },
  { icon: <SendIcon />, name: 'Mail - support@example.com' },
  { icon: <SupportAgentIcon/>, name: 'Call - 99xxx-xxxxx' },
];
function BottomButton() {
  return (
    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16,}}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}


export default BottomButton;