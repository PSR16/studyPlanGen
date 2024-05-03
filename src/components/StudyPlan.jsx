import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel } from '@mui/material';

const StudyPlan = ({ studyPlan }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const isItemChecked = (item) => {
    return checkedItems.includes(item);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '16px' }}>
      <Table>
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody>
          {studyPlan.map((week) => (
            <TableRow key={week.week}>
              <TableCell>Week {week.week}</TableCell>
              {week.days.map((day) => (
                <TableCell key={day.date}>
                  <div>
                    <Typography variant='h6' style={{alignItems: 'center'}}>{day.date}</Typography>
                    <div style={{paddingBottom: 20}}>
                      <Typography variant="subtitle1">Topics: </Typography>
                      {day.topics.map((topic) => (
                        <Typography key={topic}>{topic}</Typography>
                      ))}
                    </div>
                    <div style={{paddingBottom: 20}}>
                      <Typography variant="subtitle1">Objectives:</Typography>
                      {day.objectives.map((objective) => (
                        <div key={objective} style={{display: 'flex'}}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isItemChecked(objective)}
                                onChange={() => handleToggle(objective)}
                              />
                            }
                            label={<Typography
                              style={{ textDecoration: isItemChecked(objective) ? 'line-through' : 'none' }}
                              variant="body2"
                            >
                              {objective}
                            </Typography>}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <Typography variant="subtitle1">Study Actions:</Typography>
                      {day.studyActions.map((recall) => (
                        <div key={recall}  style={{display: 'flex', paddingBottom: 5}}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isItemChecked(recall)}
                                onChange={() => handleToggle(recall)}
                              />
                            }
                            label={<Typography
                              style={{ textDecoration: isItemChecked(recall) ? 'line-through' : 'none' }}
                              variant="body2"
                            >
                              {recall}
                            </Typography>}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <Typography variant='subtitle1'>Recommended Study Time</Typography>
                      {day.recommendedStudyTime}
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudyPlan;
