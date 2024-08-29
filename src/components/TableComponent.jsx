import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";

const TableComponent = ({
  title,
  data,
  loading,
  filterCondition,
  viewPath,
  noDataMessage,
  colors,
}) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: colors.universityBlue,
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "#FFFFFF" }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "#",
                "Student Name",
                "Subject Code",
                "Subject Name",
                "Date Requested",
                "Status",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  sx={{ color: colors.slateGray, fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      style={{ padding: "0.75rem", textAlign: "left" }}
                    >
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {data.filter(filterCondition).length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          color: colors.universityBlue,
                          fontWeight: "bold",
                        }}
                      >
                        {noDataMessage}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.filter(filterCondition).map((request, index) => (
                    <TableRow key={request.id}>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {request.student_fullname}
                      </TableCell>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {request.subject_code}
                      </TableCell>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {request.description}
                      </TableCell>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {request.created_date}
                      </TableCell>
                      <TableCell sx={{ color: colors.slateGray }}>
                        {request.form_status === "0" ? "Not approved yet" : ""}
                      </TableCell>
                      <TableCell>
                        <Link to={`${viewPath}/${request.inc_unique_number}`}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: colors.coral, // Accent color for buttons
                              color: colors.offWhite,
                              "&:hover": {
                                backgroundColor: colors.universityBlue, // Primary color on hover
                              },
                              marginRight: 1,
                            }}
                          >
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
