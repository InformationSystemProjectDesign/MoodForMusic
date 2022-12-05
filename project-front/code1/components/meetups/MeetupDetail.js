import classes from './MeetupDetail.module.css'
import Image from 'next/image'

function MeetupDetails(props) {
  return (
    <section className={classes.detail}>
        <Image
            src={props.image}
            alt={props.title}
        />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetails;