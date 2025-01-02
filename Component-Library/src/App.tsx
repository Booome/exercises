import { Badge, BadgeColor, BadgeVariant } from "./component/Badge";
import { Banner, BannerContent, BannerTitle } from "./component/Banner";
import { Card, CardContent, CardTitle } from "./component/Card";

function BadgeDisplay() {
    const variants = ["square", "pill"];
    const colors = [
        "gray",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
    ];

    return (
        <section>
            <h2>BADGES:</h2>

            {variants.map((variant) => {
                return (
                    <section
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "1rem",
                            marginTop: "1em",
                        }}
                    >
                        <h3
                            style={{
                                width: "4.5em",
                                textAlign: "right",
                                marginLeft: "0.9em",
                            }}
                        >
                            {variant.toUpperCase() + ":"}
                        </h3>
                        {colors.map((color) => {
                            return (
                                <Badge
                                    variant={variant as BadgeVariant}
                                    color={color as BadgeColor}
                                >
                                    Badge
                                </Badge>
                            );
                        })}
                    </section>
                );
            })}
        </section>
    );
}

function BannerDisplay() {
    return (
        <section>
            <h2>BANNERS:</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "120px 600px 600px",
                    gap: "1em",
                    alignItems: "center",
                }}
            >
                <div></div>
                <h3>MULTI LINE</h3>
                <h3>SINGLE LINE</h3>

                <h3 style={{ width: "6em", textAlign: "right" }}>SUCCESS</h3>
                <Banner variant="success">
                    <BannerTitle>Configurations!</BannerTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid pariatur, ipsum similique veniam.
                    </p>
                </Banner>
                <Banner variant="success">
                    <BannerTitle>Configurations!</BannerTitle>
                </Banner>

                <h3 style={{ width: "6em", textAlign: "right" }}>WARNING</h3>
                <Banner variant="warning">
                    <BannerTitle>Attention</BannerTitle>
                    <BannerContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid pariatur, ipsum similique veniam quo totam eius
                        aperiam dolorum.
                    </BannerContent>
                </Banner>
                <Banner variant="warning">
                    <BannerTitle>Attention</BannerTitle>
                </Banner>

                <h3 style={{ width: "6em", textAlign: "right" }}>ERROR</h3>
                <Banner variant="error">
                    <BannerTitle>
                        There is a problem with your application
                    </BannerTitle>
                    <BannerContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid pariatur, ipsum similique veniam quo totam eius
                        aperiam dolorum.
                    </BannerContent>
                </Banner>
                <Banner variant="error">
                    <BannerTitle>
                        There is a problem with your application
                    </BannerTitle>
                </Banner>

                <h3 style={{ width: "6em", textAlign: "right" }}>NEUTRAL</h3>
                <Banner variant="neutral">
                    <BannerTitle>Update available</BannerTitle>
                    <BannerContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquid pariatur, ipsum similique veniam.
                    </BannerContent>
                </Banner>
                <Banner variant="neutral">
                    <BannerTitle>Update available</BannerTitle>
                </Banner>
            </div>
        </section>
    );
}

function CardDisplay() {
    return (
        <section>
            <h2>CARDS:</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card>
                    <CardTitle>Easy Deployment</CardTitle>
                    <CardContent>
                        Ac tincidunt sapien vehicula erat auctor pellentesque
                        rhoncus. Et magna sit morbi lobortis.
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function App() {
    return (
        <>
            <h1>Component Library</h1>
            <BadgeDisplay />
            <BannerDisplay />
            <CardDisplay />
        </>
    );
}

export default App;
