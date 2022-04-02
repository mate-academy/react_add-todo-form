import '../../styles/components/PageNavbar.scss';
import {
  Button,
  Navbar,
  Container,
  Form,
  FormControl,
} from 'react-bootstrap';
import { PageDate } from '../../api/time';

export const PageNavbar = () => {
  const today = new PageDate();

  return (
    <Navbar className="PageNavbar" bg="danger" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand
          href="#"
          className="PageNavbar__title d-flex align-items-center"
        >
          {'TodoList | '}

          <div
            className="
              PageNavbar__date
              d-inline-flex
              flex-column
              ms-2
            "
          >
            {PageDate.getTodayMessage()}

            <div className="PageNavbar__date-weekday">
              {PageDate.getWeekDayOf(today)}
            </div>
          </div>
        </Navbar.Brand>

        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Enter your todo..."
            className="me-2"
            aria-label="Search"
          />

          <Button className="PageNavbar__button me-2" variant="light">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};
