import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function TermsOfService() {
  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Welcome to our Simple Estimation Tool! By using this tool, you agree to be bound by the following terms and conditions:</b>
          <br />
          <br />
          <b>1. Usage of the Tool</b>
          <ul>
            <li>This tool is provided for the purpose of generating task estimations.</li>
            <li>You agree to use the tool in a responsible and lawful manner, and not for any unlawful or harmful purposes.</li>
            <li>You acknowledge that the accuracy of the estimations provided by the tool is not guaranteed and may vary based on the information you provide.</li>
          </ul>
          <b>2. User Responsibility</b>
          <ul>
            <li>You are responsible for providing accurate and complete information when using the tool.</li>
            <li>You understand that the tool does not store or retain any of the information you provide.</li>
            <li>You agree to hold harmless the tool's developers and operators for any decisions or actions taken based on the estimations provided.</li>
          </ul>
          <b>3. Intellectual Property</b>
          <ul>
            <li>The tool and its underlying code are the property of the tool's developers and are protected by copyright and other intellectual property laws.</li>
            <li>You may not modify, copy, distribute, transmit, display, reproduce, or create derivative works from the tool without the prior written consent of the tool's developers.</li>
          </ul>
          <b>4. Limitation of Liability</b>
          <ul>
            <li>The tool is provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
            <li>In no event shall the tool's developers or operators be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of the tool.</li>
          </ul>
          <b>5. Changes to the Terms</b>
          <ul>
            <li>The tool's developers reserve the right to update or modify these terms of service at any time without prior notice.</li>
            <li>It is your responsibility to review these terms periodically for any changes.</li>
          </ul>
          <br />
          <b>By using this Simple Estimation Tool, you agree to the terms and conditions outlined above. If you do not agree to these terms, please refrain from using the tool.</b>
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