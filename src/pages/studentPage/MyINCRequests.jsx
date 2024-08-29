import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Pagination,
  Skeleton,
  Container,
  ButtonGroup,
  Popper,
  Grow,
  Paper as MuiPaper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGetINCRequestQuery } from "../../api/apiSlice";

const colors = {
  maroon: "#d30707",
  darkMaroon: "#b70707",
  white: "#fffffd",
  offWhite: "#FAFAFA",
  lightGray: "#F5F5F5",
  gray: "#d3d3d3",
  black: "#000000",
  teal: "#008080",
  slateGray: "#2F4F4F",
  coral: "#FF6F61",
};

const MyINCRequests = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestQuery({ student_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openIndex, setOpenIndex] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMenuItemClick = (index, action) => {
    console.log(
      `Action: ${action} for Request ID: ${requestIncForms[index].id}`
    );
    setOpenIndex(null); // Close the menu after action
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle popper for the row
  };

  const startIndex = (page - 1) * rowsPerPage;
  const displayedRequests = requestIncForms.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const options = ["View", "Edit", "Cancel"];

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: colors.lightGray,
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: colors.black,
          }}
        >
          My INC Requests
        </Typography>
        <Paper elevation={3}>
          {incRequestLoading ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: colors.maroon }}>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Subject Code
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Subject Name
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Instructor
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Date Requested
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        color: colors.white,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: rowsPerPage }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton width={50} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton width={200} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : incRequestError ? (
            <Typography
              variant="h6"
              style={{
                color: colors.maroon,
                textAlign: "center",
                padding: "20px",
              }}
            >
              Error loading data
            </Typography>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: colors.maroon }}>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Subject Code
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Subject Name
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Instructor
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Date Requested
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          color: colors.white,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedRequests.map((request, index) => (
                      <TableRow
                        key={request.id}
                        hover
                        style={{
                          backgroundColor: colors.offWhite,
                          borderBottom: `1px solid ${colors.gray}`,
                        }}
                      >
                        <TableCell sx={{ color: colors.slateGray }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ color: colors.slateGray }}>
                          {request.subject_code}
                        </TableCell>
                        <TableCell sx={{ color: colors.slateGray }}>
                          {request.description}
                        </TableCell>
                        <TableCell sx={{ color: colors.slateGray }}>
                          {request.instructor_fullname}
                        </TableCell>
                        <TableCell sx={{ color: colors.slateGray }}>
                          {request.created_date.split(" ")[0]}{" "}
                          {/* Display date only */}
                        </TableCell>
                        <TableCell
                          sx={{ color: getStatusColor(request.form_status) }}
                        >
                          {getStatusText(request.form_status)}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup
                            variant="contained"
                            aria-label="button group with a nested menu"
                          >
                            <Link
                              to={`/myinc-requests/${request.inc_unique_number}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button>View</Button>
                            </Link>
                            <Button
                              id={`split-button-${index}`}
                              size="small"
                              aria-controls={
                                openIndex === index
                                  ? "split-button-menu"
                                  : undefined
                              }
                              aria-expanded={
                                openIndex === index ? "true" : undefined
                              }
                              aria-label="select action"
                              aria-haspopup="menu"
                              onClick={() => handleToggle(index)}
                            >
                              <ArrowDropDownIcon />
                            </Button>
                            <Popper
                              open={openIndex === index}
                              anchorEl={document.getElementById(
                                `split-button-${index}`
                              )}
                              role={undefined}
                              transition
                              disablePortal
                              sx={{ zIndex: 1300 }} // Adjust the zIndex here
                            >
                              {({ TransitionProps, placement }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{
                                    transformOrigin:
                                      placement === "bottom"
                                        ? "center top"
                                        : "center bottom",
                                  }}
                                >
                                  <MuiPaper>
                                    <ClickAwayListener
                                      onClickAway={() => setOpenIndex(null)}
                                    >
                                      <MenuList
                                        autoFocusItem={openIndex === index}
                                        id="split-button-menu"
                                      >
                                        {options.map((option, optIndex) => (
                                          <MenuItem
                                            key={option}
                                            onClick={() =>
                                              handleMenuItemClick(index, option)
                                            }
                                          >
                                            {option}
                                          </MenuItem>
                                        ))}
                                      </MenuList>
                                    </ClickAwayListener>
                                  </MuiPaper>
                                </Grow>
                              )}
                            </Popper>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: colors.lightGray,
                }}
              >
                <Typography
                  sx={{
                    color: colors.slateGray,
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                >
                  Showing {Math.min(rowsPerPage, requestIncForms.length)} of{" "}
                  {requestIncForms.length} entries
                </Typography>
                <Pagination
                  count={Math.ceil(requestIncForms.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </div>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case "0":
      return colors.slateGray; // Pending
    case "1":
      return colors.teal; // Approved
    case "2":
      return colors.coral; // Rejected
    default:
      return colors.slateGray;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "0":
      return "Pending";
    case "1":
      return "Approved";
    case "2":
      return "Rejected";
    default:
      return "Unknown";
  }
};

export default MyINCRequests;
