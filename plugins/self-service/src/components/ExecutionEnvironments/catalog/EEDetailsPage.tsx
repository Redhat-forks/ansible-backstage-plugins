import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  MenuItem,
  Divider,
  Breadcrumbs,
  Link,
  Button,
  Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    marginBottom: theme.spacing(2),
  },
  menuPaper: {
    width: 300,
    borderRadius: 12,
    boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
    padding: '4px 0',
    backgroundColor: '#0f0f0f',
  },
  menuItem: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(1.5, 2.2),
    '&:hover': {
      backgroundColor: '#363636',
    },
  },
  linkText: {
    color: '#1976d2',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      textDecoration: 'underline',
      transform: 'scale(1.03)',
    },
  },
  tagButton: {
    borderRadius: 8,
    borderColor: '#D3D3D3',
    textTransform: 'none',
  },
}));

export const EEDetailsPage: React.FC = () => {
  const { templateName } = useParams<{ templateName: string }>();
  const classes = useStyles();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box p={3}>
      {/* Breadcrumb */}
      <Breadcrumbs className={classes.breadcrumb}>
        <Link color="inherit" href="#">
          Execution environment definition files
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/self-service/ee/')}
        >
          Catalog
        </Link>
        <Typography color="textPrimary">{templateName}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            style={{ fontWeight: 700, fontSize: '1.5rem' }}
          >
            {templateName}
          </Typography>
          <IconButton size="small">
            <StarBorderIcon />
          </IconButton>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        {/* Menu Popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          classes={{ paper: classes.menuPaper }}
        >
          {/* Menu Options */}
          {[
            {
              title: 'Make a copy',
              desc: 'Create an Ansible image of this automation with all dependencies, to be run anywhere.',
              color: '#f7f7f7',
            },
            {
              title: 'Delete',
              desc: 'View source code of your automation content.',
              color: '#C72C0C',
            },
          ].map((item, i) => (
            <MenuItem key={i} className={classes.menuItem}>
              <Typography
                style={{
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: item.color,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                style={{
                  fontSize: '0.83rem',
                  color: '#6B6B6B',
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </Typography>
            </MenuItem>
          ))}
        </Popover>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        style={{ marginTop: 16, marginBottom: 24 }}
      >
        <Tab label="Overview" />
        <Tab label="Docs" />
      </Tabs>

      {/* Overview */}
      {tab === 0 && (
        <Box display="flex" gridGap={24}>
          {/* Left Column */}
          <Box
            flex={1}
            maxWidth={320}
            display="flex"
            flexDirection="column"
            gridGap={24}
          >
            {/* Links Card */}
            <Card
              variant="outlined"
              style={{ borderRadius: 16, borderColor: '#D3D3D3' }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    margin: '6px 0 13px 10px',
                  }}
                >
                  Links
                </Typography>
                <Divider style={{ margin: '0 -16px 12px' }} />

                {[
                  { icon: <GetAppIcon />, text: 'Download ee.yaml file' },
                  { icon: <AssignmentIcon />, text: 'Build an EE' },
                  { icon: <VisibilityIcon />, text: 'View software template' },
                ].map((item, i) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    gridGap={12}
                    style={{ marginLeft: 10, marginBottom: 10 }}
                  >
                    {item.icon}
                    <Typography variant="body1" className={classes.linkText}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* About Card */}
            <Card
              variant="outlined"
              style={{ borderRadius: 16, borderColor: '#D3D3D3' }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      marginLeft: 10,
                    }}
                  >
                    About
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton size="small">
                      <AutorenewIcon style={{ color: '#757575' }} />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon style={{ color: '#1976d2' }} />
                    </IconButton>
                  </Box>
                </Box>

                <Divider style={{ margin: '16px 0' }} />

                {/* Details */}
                <Box>
                  <Typography
                    variant="caption"
                    style={{ color: 'gray', fontWeight: 600 }}
                  >
                    DESCRIPTION
                  </Typography>
                  <Typography variant="body2">{'<Description>'}</Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={8}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      style={{ color: 'gray', fontWeight: 600 }}
                    >
                      OWNER
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ color: '#1976d2', cursor: 'pointer' }}
                    >
                      {'<user>'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      style={{ color: 'gray', fontWeight: 600 }}
                    >
                      TYPE
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: 600 }}>
                      EE definition
                    </Typography>
                  </Box>
                </Box>

                <Box marginTop={8}>
                  <Typography
                    variant="caption"
                    style={{ color: 'gray', fontWeight: 600 }}
                  >
                    TAGS
                  </Typography>
                  <Box display="flex" gridGap={8} marginTop={4}>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.tagButton}
                    >
                      EE
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.tagButton}
                    >
                      Execution Environment
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column */}
          <Box flex={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    margin: '6px 0 13px 10px',
                  }}
                >
                  Next Steps: Build and Use Your Execution Environment 🛠️
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  style={{
                    whiteSpace: 'pre-line',
                    marginLeft: 10,
                    marginTop: 14,
                    marginBottom: 10,
                  }}
                >
                  {`Follow these steps to build your Execution Environment (EE) container image and integrate it with your automation platform.

                    Step 1: Create Project Directory & Save Definition 📁
                    1. Create a dedicated directory for your Execution Environment.
                    2. Save the generated EE definition YAML file (e.g., ee.yaml) inside this directory.
                    3. Navigate to it using: cd my-custom-ee

                    Step 2: Install Required Tools 💻
                    1. Container Runtime: Install Podman (recommended) or Docker.
                    2. Ansible Builder: pip install ansible-builder

                    Step 3: Build Your Execution Environment (EE)
                    ansible-builder build --tag my-ee-image:latest

                    Step 4: Publish the EE Image to a Registry
                    Push your image to your automation platform or registry.

                    Step 4: Publish the EE Image to a Registry

                    The built EE image must be accessible by your automation platform (e.g., Ansible Automation Platform or AWX).

                    1. Tag the Image: Tag your local image for the target registry (e.g., Quay.io or a private registry):
                    2. Bash
                    3. podman tag my-ee-image:latest registry.your-org.com/my-ee-image:latest
                    4. Push the Image: Log in and push the final image to the registry:
                    5. Bash
                    6. podman push registry.your-org.com/my-ee-image:latest

                    Step 5: Integrate and Use the EE

                    Integrate your published EE with your Automation Controller and link it to your Ansible content:

                    1. Define the Execution Environment: In the Execution Environments section of your Controller, create a new record pointing to the full image path: registry.your-org.com/my-ee-image:latest.
                    2. Link to a Project: Edit an existing Ansible Project or Job Template and select your newly defined EE as the runtime for that job. When the job runs, it will execute inside your specific, consistent container environment.`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
      {tab === 1 && (
        <div data-testid="docs-content">
          <Typography variant="h4" style={{ marginBottom: 16 }}>
            Documentation
          </Typography>
          <Typography variant="body1">
            Documentation for Execution Environments will be available here.
          </Typography>
        </div>
      )}
    </Box>
  );
};
