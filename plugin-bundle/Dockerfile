FROM alpine:3.18
WORKDIR /plugin
COPY plugin.json /plugin/plugin.json
# copy skills during build (workflow will populate plugin-bundle/skills)
COPY skills /plugin/skills

# Add OCI labels for discoverability
LABEL org.opencontainers.image.title="Stock Skills Plugin"
LABEL org.opencontainers.image.description="Bundle of MCP/agent skills for Copilot Agent Customizations"
LABEL org.opencontainers.image.version="0.0.1"

CMD ["/bin/sh", "-c", "echo Plugin image built; ls -la /plugin && sleep 3600"]
