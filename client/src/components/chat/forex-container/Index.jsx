import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/store";

const ForexPanel = () => {
  const { forexData } = useAppStore();

  return (
    <div className=" fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <div className="flex justify-center mt-8 p-4">
        <Card className="w-full max-w-3xl shadow-lg border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Real-Time Forex Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full text-sm text-left text-gray-500">
              <TableHeader>
                <TableRow className="bg-gray-100 text-gray-600">
                  <TableCell>Currency Pair</TableCell>
                  <TableCell>Bid</TableCell>
                  <TableCell>Ask</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forexData.map((data, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>{data.pair}</TableCell>
                    <TableCell>{data.bid}</TableCell>
                    <TableCell>{data.ask}</TableCell>
                    <TableCell>
                      {new Date(data.timestamp).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForexPanel;
