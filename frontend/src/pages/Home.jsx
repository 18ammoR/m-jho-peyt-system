import { Grid, Card, CardContent, CardMedia, CardActions, Typography, Button } from "@mui/material";

const items = [
  { id: 1, title: "React", desc: "UI Library", img: "/images/react.jpg" },
  { id: 2, title: "MUI", desc: "Component Library", img: "/images/mui.jpg" },
  { id: 3, title: "Node.js", desc: "Backend Runtime", img: "/images/node.jpg" },
];

export default function Home() {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": { boxShadow: 8 },
              transition: "box-shadow 0.3s",
            }}
          >
            <CardMedia component="img" height={180} image={item.img} alt={item.title} />

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="text.secondary">{item.desc}</Typography>
            </CardContent>

            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}