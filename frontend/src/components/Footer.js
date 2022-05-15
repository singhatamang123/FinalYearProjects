import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>

      <Container >
        <footer className="page-footer font-small blue pt-4" bg="dark">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">NepShop</h5>
                <p>Nepshop is a webapplication where user can get recommended products and can play with it </p>
              </div>


            </div>
          </div>

          <div className="footer-copyright text-center m-auto">
            <h5 className="text-center"> © 2020 Copyright: NepShop
            </h5>
          </div>

        </footer>
      </Container>
    </Navbar>

  );
}

export default Footer;
