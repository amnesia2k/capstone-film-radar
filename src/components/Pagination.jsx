import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";

const Pagination = ({ activePage, totalPages, setActivePage }) => {
  return (
    <div className="flex justify-center md:justify-start item-center gap-5">
      <div className="flex items-center gap-2 my-10">
        <Button
          variant="outline"
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
          className={`rounded-full text-white`}
        >
          <ArrowLeft />
        </Button>
        <div>
          <h3 className="text-sm md:text-basefont-semibold">
            {activePage} of {totalPages}
          </h3>
        </div>
        <Button
          variant="outline"
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
          className="rounded-full text-white"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default Pagination;
