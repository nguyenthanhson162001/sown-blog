
import { Grid, Backdrop, CircularProgress } from "@mui/material"
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "../../queries/ProjectsQueries";
import React from "react"
import SideProjectCard from "../../components/card/SideProjectCard";
import styled from "@emotion/styled";
const CGrid = styled(Grid)(({ theme }) => ({

}));
const Root = styled("div")(({ theme }) => ({
    "& .list-projects": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }
}));
export default function ProjectsSection() {
    const { data, loading, error } = useQuery(GET_PROJECTS_QUERY);
    console.log(data)
    return (
        <Root>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="list-projects">
                <Grid container spacing={2}>
                    {
                        data?.projects?.data.map((project: any) => {
                            return (
                                <CGrid item xs={12} md={4}>
                                    <SideProjectCard
                                        description={project.attributes.description}
                                        link={project.attributes.websiteUrl}
                                        github={project.attributes.github}
                                        name={project.attributes.name}
                                        technologies={project.attributes.tags.data?.map((technology: any) => (technology.attributes.name))}
                                        thumbnail={project.attributes.thumbnail.data.attributes.url}
                                    />
                                </CGrid>
                            )
                        })
                    }

                </Grid>
            </div>
        </Root>
    )
}
