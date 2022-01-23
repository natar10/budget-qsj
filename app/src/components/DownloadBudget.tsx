import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ROOT } from "../common/constants";

export const DownloadBudget = () => {
  const { t } = useTranslation("es");

  const downloadPdfDocument = () => {
    const input = document.getElementById(ROOT);
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });
      pdf.addImage(imgData, "JPEG", 0, 0, 190, 290);
      pdf.save(`${t("qsj")}-${t("budget")}.pdf`);
    });
  };

  return (
    <Button size="lg" onClick={downloadPdfDocument}>
      {t("download-budget")}
    </Button>
  );
};
