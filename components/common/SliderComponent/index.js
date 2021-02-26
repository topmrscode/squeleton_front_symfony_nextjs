import {
  Sheet,
  Button,
  Heading,
  Scrollable,
  PageActions,
} from "@shopify/polaris"
import { MobileCancelMajor } from "@shopify/polaris-icons"
import styles from "./slider-component.module.css"

export default function SliderComponent({
  active,
  content,
  handleClose,
  labelAction,
}) {
  return (
    <Sheet open={active} onClose={handleClose}>
      <div className={styles["slider-container"]}>
        <div className={styles["slider-container-head"]}>
          <Heading>{labelAction}</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajor}
            onClick={handleClose}
            plain
          />
        </div>
        <Scrollable className={styles["slider-container-content"]}>
          {content}
        </Scrollable>
        <div className={styles["slider-container-footer"]}>
          <PageActions
            secondaryActions={{
              content: "Fermer",
              onAction: handleClose,
            }}
          />
        </div>
      </div>
    </Sheet>
  )
}
