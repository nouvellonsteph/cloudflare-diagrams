# Cloudflare Diagram Tool

A visual diagram editor for creating and sharing Cloudflare architecture diagrams. Built with React and ReactFlow, this tool allows you to visually design and document your Cloudflare infrastructure.

## Features

- Interactive diagram editor with drag-and-drop interface
- Support for all major Cloudflare products across categories:
  - Security (WAF, DDoS Protection, Bot Management, Access, Teams)
  - Performance (CDN)
  - Developer Tools (Workers, Pages, R2, D1, KV, Durable Objects)
  - Network Services (DNS, Spectrum)
  - Reliability (Load Balancing)
- Customizable connections between products
- Mini-map for easy navigation
- Export capabilities for sharing diagrams

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cloudflare-diagram-tool.git
cd cloudflare-diagram-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. **Creating a New Diagram**
   - Use the product selector panel to choose Cloudflare products
   - Drag and drop products onto the canvas
   - Connect products by dragging from one node's handle to another

2. **Editing Connections**
   - Click on any connection line to edit its properties
   - Add labels to describe the relationship between products

3. **Organizing Your Diagram**
   - Drag nodes to reposition them
   - Use the mini-map for navigation in large diagrams
   - Snap-to-grid functionality for precise alignment

4. **Exporting**
   - Use the export panel to save or share your diagram

## Available Products

### Security
- WAF (Web Application Firewall)
- DDoS Protection
- Bot Management
- Access (Zero Trust access management)
- Teams (Secure enterprise network)

### Performance
- CDN (Content Delivery Network)

### Developer Tools
- Workers (Serverless computing platform)
- Pages (JAMstack platform)
- R2 (Object storage)
- D1 (SQL Database)
- KV (Key-value storage)
- Durable Objects (Distributed computing)

### Network Services
- DNS (Managed DNS service)
- Spectrum (TCP/UDP proxy)

### Reliability
- Load Balancing (Global load balancer)

## Development

- Build the project:
```bash
npm run build
```

- Run linting:
```bash
npm run lint
```

- Preview production build:
```bash
npm run preview
```

## Technologies Used

- React
- ReactFlow
- TypeScript
- Vite
- Zustand (State Management)
- Cloudflare Component Libraries
