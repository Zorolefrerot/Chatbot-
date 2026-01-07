import { motion } from "framer-motion";
import { Bot, Terminal, FileText, ExternalLink, Activity, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Facebook Messenger Bot
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful backend service with Gemini AI integration for automated responses and image recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle>System Status</CardTitle>
              </div>
              <CardDescription>Current operational state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <span className="text-sm font-medium">Service Type</span>
                <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded border border-border">Backend Process</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                <span className="text-sm font-medium">AI Engine</span>
                <span className="text-sm text-primary font-medium bg-primary/5 px-2 py-1 rounded">Gemini Vision</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Info className="w-4 h-4" />
                <span>This interface is for status monitoring only.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Terminal className="w-5 h-5 text-orange-500" />
                </div>
                <CardTitle>Quick Start</CardTitle>
              </div>
              <CardDescription>Commands to run the bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Start Bot</label>
                <div className="bg-slate-950 text-slate-50 p-3 rounded-lg font-mono text-sm flex items-center justify-between group">
                  <code>node bot/index.js</code>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requirements</label>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded-md border border-border font-medium">Node.js</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-md border border-border font-medium">fbstate</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-md border border-border font-medium">Gemini API</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Documentation
              </h3>
              <p className="text-muted-foreground text-sm">
                Detailed setup instructions and command lists are available in the project documentation.
              </p>
            </div>
            <a 
              href="/bot/README.md" 
              target="_blank"
              className="px-6 py-3 rounded-xl bg-background border border-border shadow-sm hover:shadow-md hover:bg-muted/50 transition-all font-medium text-sm flex items-center gap-2 whitespace-nowrap"
            >
              Read README.md
              <ExternalLink className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>
        
        <footer className="text-center text-sm text-muted-foreground pt-8">
          <p>© {new Date().getFullYear()} Facebook Messenger Bot. Built with Node.js & React.</p>
        </footer>
      </motion.div>
    </div>
  );
          }
