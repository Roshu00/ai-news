import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, PenLine } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full py-20 bg-white text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black mb-6">
          VESTI – Ali za smeh, ne za paniku!
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Dobrodošao na prvu platformu posvećenu isključivo satiričnim vestima i
          izmišljenim pričama koje nasmeju, a ne dezinformišu. Pridruži se
          zajednici čitalaca i autora koji znaju da se smeh leči – a laž koristi
          samo za zabavu.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="text-base">
            <ArrowRight className="mr-2 h-5 w-5" />
            Pridruži se kao čitalac
          </Button>
          <Button size="lg" variant="outline" className="text-base">
            <PenLine className="mr-2 h-5 w-5" />
            Postani kreator vesti
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          ⚠️ Sve vesti su 100% izmišljene i služe isključivo za zabavu. Nema
          širenja dezinformacija!
        </p>
      </div>
    </section>
  );
};

export default Hero;
