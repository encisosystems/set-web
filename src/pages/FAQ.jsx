import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function FAQ() {
  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle>Frequently Asked Questions</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>1. What is the purpose of this tool?</b>
          <ul>
            <li>This tool is designed to provide task estimations to help with project planning and management.</li>
          </ul>

          <b>2. How accurate are the estimations?</b>
          <ul>
            <li>The accuracy of the estimations provided by the tool is not guaranteed and may vary based on the information you provide.</li>
            <li>The estimations should be used as a guide, and you should exercise your own judgment when making decisions based on them.</li>
          </ul>

          <b>3. Does the tool store or retain my information?</b>
          <ul>
            <li>No, the tool does not store or retain any of the information you provide.</li>
          </ul>

          <b>4. Can I use the tool for any purpose?</b>
          <ul>
            <li>You agree to use the tool in a responsible and lawful manner, and not for any unlawful or harmful purposes.</li>
          </ul>

          <b>5. What if I have additional questions?</b>
          <ul>
            <li>If you have any other questions or concerns, please feel free to contact the tool's developers.</li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.location.href = '/'} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}