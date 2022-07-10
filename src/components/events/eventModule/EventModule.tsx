import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './EventModule.module.css';

interface EventModuleProps {
  props: any
}

const EventModule: React.FC<EventModuleProps> = ({props}) => {

  // const [selectedDay, setSelectedDay] = useState<eventObj>({})

  return (
    <div className={styles.EventModule}>
      <article>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.Dates}
            </Typography>
            <Typography variant="h5" component="div">
              {props.Title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {props.Description}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </article>
    </div>
  );
}

export default EventModule;