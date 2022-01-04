import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SvgIconTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StoreIcon from "@material-ui/icons/Store";
import { subNaviStyles } from "./SubNavigation";

interface AccordianElementSelectProps {
  summaryText: String;
  SummaryIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  detailTexts: Array<string>;
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AccordianElement({
  summaryText,
  SummaryIcon,
  detailTexts,
  isSelect,
  setIsSelect,
}: AccordianElementSelectProps) {
  const classes = subNaviStyles();

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
            ? classes.selecedAccordionElement
            : classes.accordionSummaryElement
        }
      >
        <SummaryIcon className={classes.icon} />
        {summaryText}
      </AccordionSummary>

      {detailTexts.map((detailText) => {
        return <AccordionDetails>{detailText}</AccordionDetails>;
      })}
    </Accordion>
  );
}
