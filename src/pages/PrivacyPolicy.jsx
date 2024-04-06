import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle>Privacy Policy</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Welcome to our Simple Estimation Tool! By using this tool, you agree to the following privacy policy:</b>
          <br />
          <br />
          <b>1. Data Collection</b>
          <ul>
            <li>We collect the task information you provide when using the estimation tool.</li>
            <li>We do not store or retain any of the information you provide.</li>
          </ul>
          <b>2. Data Use</b>
          <ul>
            <li>The information you provide is used solely to generate task estimations.</li>
            <li>We do not use your information for any other purpose.</li>
          </ul>
          <b>3. Data Protection</b>
          <ul>
            <li>We take reasonable measures to protect the security of the information you provide.</li>
            <li>However, we cannot guarantee the absolute security of your information.</li>
          </ul>
          <b>4. Third-Party Sharing</b>
          <ul>
            <li>We do not share your information with any third parties.</li>
          </ul>
          <b>5. Changes to the Privacy Policy</b>
          <ul>
            <li>We reserve the right to update or modify this privacy policy at any time without prior notice.</li>
            <li>It is your responsibility to review this policy periodically for any changes.</li>
          </ul>
          <br />
          <b>By using this Simple Estimation Tool, you agree to the privacy policy outlined above. If you do not agree to these terms, please refrain from using the tool.</b>
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