import { Button } from "react-bootstrap";

function MobileQueueButton(props) {

  return (
    <div className='mobile-queue-control'>
      <Button onClick={() => props.mobileSwitchContent()} className="btn btn-info">
        {
          (props.mobileShowContentNotQueue) ? 
            <>Show Queue</> :
            <>Hide Queue</>
        }
      </Button>
    </div>
  );
}

export default MobileQueueButton;