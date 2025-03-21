"use client";

import { useState } from 'react';
import { CropRecommendation } from "@/app/components/dashboard/crop-recommendation";
import { ExpectedOutcomes } from "@/app/components/dashboard/expected-outcomes";
import { FarmOverview } from "@/app/components/dashboard/farm-overview";
import { NewFarmerDashboard } from "@/app/components/dashboard/new-farmer-dashboard";
import { NextSteps } from "@/app/components/dashboard/next-steps";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const DISTRICTS = [
  'Matale', 'NuwaraEliya', 'Puttalama', 'Vavuniya', 'Badulla', 'Batticaloa', 'Kilinochchi', 
  'Kandy', 'Kurunegala', 'Trincomalee', 'Anuradhapura', 'Ampara', 'Jaffna', 'Bandarawela', 
  'Rathnapura', 'Welimada', 'Monaragala', 'Mannar', 'Gampaha', 'Haputhale', 'Colombo', 'Kegalle'
];

export default function NewFarmerClient() {
  const [district, setDistrict] = useState<string>('');
  const [farmSize, setFarmSize] = useState<number | undefined>(undefined);
  const [soilType, setSoilType] = useState<string>('');

  return (
    <div className="p-5">
      <div className="mb-6 justify-center">
        <div className ="justify-center">
          <Label htmlFor="district">District</Label>
          <div className ="justify-center pt-2 ">
            <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger id="district" className="bg-green-50">
                <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent>
                {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
                </SelectContent>
            </Select>
          </div>
          
        </div>
      </div>

      {district && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FarmOverview className="md:col-span-2 lg:col-span-2" farmData={{ farm_size: farmSize, district, soil_type: soilType }} />
            <CropRecommendation className="md:col-span-2 lg:col-span-1" district={district} farmSize={farmSize} soilType={soilType} />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ExpectedOutcomes district={district} />
            {/* Placeholder for ResourceRequirements */}
            <Card><CardContent>Resource Requirements (To be implemented)</CardContent></Card>
          </div>
          <div className="mt-6 grid gap-6">
            <NewFarmerDashboard district={district} />
            <NextSteps />
          </div>
        </>
      )}
    </div>
  );
}