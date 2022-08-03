import PropTypes from "prop-types";
const Footer = ({ theme }) => {
  console.log('<Footer /> renderd');
  return (
    <footer
      className={`footer ${theme}  d-flex flex-wrap justify-content-between align-items-center py-3 border-top p-4 `}
    >
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          <svg className="bi" width="30" height="24">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
        <span className="mb-3 mb-md-0 text-muted">© 2022 React Todo </span>
      </div>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="" href="https://github.com/FereydoonEisapour">
            <span className="bi me-1 mr-3 " width="16" height="16">
              <i
                className="fa fa-github text-muted"
                style={{ fontSize: "24px" }}
              ></i>
            </span>
          </a>
        </li>
      </ul>
    </footer>
  );
};
Footer.propTypes = {
  theme: PropTypes.string,
};
export default Footer;
