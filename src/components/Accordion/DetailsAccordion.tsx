import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ReactNode } from "react";

interface DetailsAccordionProps {
  id: string;
  title: string;
  description?: React.ReactNode;
  children: ReactNode;
  expanded?: boolean;
  onChange?: (id: string, expanded: boolean) => void;
}

const DetailsAccordion = ({
  id,
  title,
  description,
  children,
  expanded,
  onChange,
}: DetailsAccordionProps) => {
  const isNarrow = useMediaQuery("(max-width:1100px)");

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => onChange?.(id, isExpanded)}
      id={id}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 2,
          py: 1,
          minHeight: "40px",
          maxHeight: "40px",
          backgroundColor: "#F5F5F5",
          "& .MuiAccordionSummary-content": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 0,
            width: "100%",
          },
        }}
      >
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography
            variant="body1"
            fontSize="1rem"
            fontFamily="Roboto"
            lineHeight="150%"
            letterSpacing="0.15px"
            component="div"
          >
            {title}
          </Typography>

          {description && (
            <Box
              sx={{
                mt: isNarrow ? 0.5 : 0,
                position: isNarrow ? "static" : "absolute",
                left: isNarrow ? undefined : "50%",
                transform: isNarrow ? undefined : "translateX(-50%)",
                textAlign: isNarrow ? "left" : "center",
              }}
            >
              {description}
            </Box>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default DetailsAccordion;
