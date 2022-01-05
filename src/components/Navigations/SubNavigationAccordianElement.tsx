import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SvgIconTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { useHistory } from "react-router";
import { subNaviStyles } from "./SubNavigation";

interface AccordianElementSelectProps {
  summaryText: String;
  SummaryIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  detailElement: Array<{
    title: string;
    path: string;
  }>;
}
export default function AccordianElement({
  summaryText,
  SummaryIcon,
  detailElement,
}: AccordianElementSelectProps) {
  const classes = subNaviStyles();
  const history = useHistory();
  const [isSelect, setIsSelect] = useState(false);

  return (
    <Accordion
      className={classes.accordionElement}
      square
      onChange={() => {
        setIsSelect(!isSelect);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={
          isSelect
            ? classes.selectedAccordionElement
            : classes.accordionSummaryElement
        }
      >
        <SummaryIcon className={classes.icon} />
        {summaryText}
      </AccordionSummary>

      {detailElement.map((value) => {
        return (
          <AccordionDetails
            className={classes.accordionDetailElement}
            onClick={() => {
              history.push(value.path);
            }}
          >
            {value.title}
          </AccordionDetails>
        );
      })}
    </Accordion>
  );
}
