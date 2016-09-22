-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `beacons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beacons` (
  `bea_device_id` VARCHAR(45) NOT NULL,
  `bea_active_yn` VARCHAR(1) NOT NULL,
  `bea_name` VARCHAR(45) NOT NULL,
  `bea_active_start_date_time` DATETIME NULL,
  `bea_active_end_date_time` VARCHAR(45) NULL,
  PRIMARY KEY (`bea_device_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `org_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `org_types` (
  `ort_type` VARCHAR(20) NOT NULL,
  `ort_descr` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ort_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `organisations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `organisations` (
  `org_user_name` VARCHAR(45) NOT NULL,
  `ort_active_yn` VARCHAR(1) NOT NULL,
  `org_name` VARCHAR(45) NOT NULL,
  `org_descr` VARCHAR(200) NULL,
  `org_ort_type` VARCHAR(20) NOT NULL,
  `org_active_start_date` DATETIME NULL,
  `org_active_end_date` DATETIME NULL,
  PRIMARY KEY (`org_user_name`, `org_ort_type`),
  CONSTRAINT `fk_organisation_org_type`
    FOREIGN KEY (`org_ort_type`)
    REFERENCES `org_types` (`ort_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_organisation_org_type_idx` ON `organisations` (`org_ort_type` ASC);


-- -----------------------------------------------------
-- Table `participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `participants` (
  `par_user_name` VARCHAR(45) NOT NULL,
  `par_active_yn` VARCHAR(1) NOT NULL,
  `par_name` VARCHAR(45) NULL,
  `par_descr` VARCHAR(200) NULL,
  `par_active_start_date_time` DATETIME NULL,
  `par_active_end_date_time` DATETIME NULL,
  `organisations_org_user_name` VARCHAR(45) NOT NULL,
  `organisations_org_ort_type` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`par_user_name`, `organisations_org_user_name`, `organisations_org_ort_type`),
  CONSTRAINT `fk_participants_organisations1`
    FOREIGN KEY (`organisations_org_user_name` , `organisations_org_ort_type`)
    REFERENCES `organisations` (`org_user_name` , `org_ort_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_participants_organisations1_idx` ON `participants` (`organisations_org_user_name` ASC, `organisations_org_ort_type` ASC);


-- -----------------------------------------------------
-- Table `clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clients` (
  `cli_user_name` VARCHAR(45) NOT NULL,
  `cli_active_yn` VARCHAR(1) NOT NULL,
  `cli_name` VARCHAR(45) NULL,
  `cli_descr` VARCHAR(200) NULL,
  `cli_active_start_date` DATE NULL,
  `cli_active_end_date` DATE NULL,
  PRIMARY KEY (`cli_user_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `light_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `light_settings` (
  `lis_id` VARCHAR(45) NOT NULL,
  `lis_level` INT NOT NULL,
  `lis_active_start_date_time` DATETIME NULL,
  `lis_active_end_date_time` DATETIME NULL,
  `lis_bea_device_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`lis_id`, `lis_bea_device_id`),
  CONSTRAINT `fk_lights_beacons1`
    FOREIGN KEY (`lis_bea_device_id`)
    REFERENCES `beacons` (`bea_device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_lights_beacons1_idx` ON `light_settings` (`lis_bea_device_id` ASC);


-- -----------------------------------------------------
-- Table `geo_fences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geo_fences` (
  `gef_id` INT NOT NULL,
  `gef_active_yn` VARCHAR(1) NOT NULL,
  `gef_active_start_date_time` DATETIME NULL,
  `gef_active_end_date_time` DATETIME NULL,
  `gef_location` GEOMETRY NULL,
  PRIMARY KEY (`gef_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `eve_id` VARCHAR(45) NOT NULL,
  `eve_active_yn` VARCHAR(1) NOT NULL,
  `eve_name` VARCHAR(45) NOT NULL,
  `eve_descr` VARCHAR(200) NULL,
  `eve_active_start_date_time` DATETIME NULL,
  `eve_active_end_date_time` DATETIME NULL,
  `geo_fence_gef_id` INT NOT NULL,
  PRIMARY KEY (`eve_id`, `geo_fence_gef_id`),
  CONSTRAINT `fk_events_geo_fence1`
    FOREIGN KEY (`geo_fence_gef_id`)
    REFERENCES `geo_fences` (`gef_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_events_geo_fence1_idx` ON `events` (`geo_fence_gef_id` ASC);


-- -----------------------------------------------------
-- Table `beacon_allocations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beacon_allocations` (
  `bal_active_yn` VARCHAR(1) NOT NULL,
  `bal_active_start_date_time` DATETIME NULL,
  `bal_active_end_date_time` DATETIME NULL,
  `bal_eve_id` VARCHAR(45) NOT NULL,
  `bal_bea_device_id` VARCHAR(45) NOT NULL,
  `bal_par_user_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`bal_active_yn`, `bal_eve_id`, `bal_bea_device_id`, `bal_par_user_name`),
  CONSTRAINT `fk_beacon_allocations_events1`
    FOREIGN KEY (`bal_eve_id`)
    REFERENCES `events` (`eve_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beacon_allocations_beacons1`
    FOREIGN KEY (`bal_bea_device_id`)
    REFERENCES `beacons` (`bea_device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beacon_allocations_users1`
    FOREIGN KEY (`bal_par_user_name`)
    REFERENCES `participants` (`par_user_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_beacon_allocations_events1_idx` ON `beacon_allocations` (`bal_eve_id` ASC);

CREATE INDEX `fk_beacon_allocations_beacons1_idx` ON `beacon_allocations` (`bal_bea_device_id` ASC);

CREATE INDEX `fk_beacon_allocations_users1_idx` ON `beacon_allocations` (`bal_par_user_name` ASC);


-- -----------------------------------------------------
-- Table `proximity_definitions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proximity_definitions` (
  `prd_id` INT NOT NULL,
  `prd_active_yn` VARCHAR(1) NOT NULL,
  `prd_name` VARCHAR(45) NOT NULL,
  `prd_descr` VARCHAR(200) NULL,
  `prd_x_range_start` GEOMETRY NOT NULL,
  `prd_x_range_end` GEOMETRY NOT NULL,
  `prd_y_range_start` GEOMETRY NOT NULL,
  `prd_y_range_end` GEOMETRY NOT NULL,
  `prd_z_range_start` GEOMETRY NOT NULL,
  `prd_z_range_end` GEOMETRY NOT NULL,
  `prd_active_start_date_time` DATETIME NULL,
  `prd_active_end_date_time` DATETIME NULL,
  PRIMARY KEY (`prd_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `time_definitions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `time_definitions` (
  `tid_id` INT NOT NULL,
  `tid_active_yn` VARCHAR(1) NOT NULL,
  `tid_active_start_date_time` DATETIME NULL,
  `tid_active_end_date_time` DATETIME NULL,
  `tid_duration` DATETIME NOT NULL,
  PRIMARY KEY (`tid_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `duration_defintions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `duration_defintions` (
  `dud_id` INT NOT NULL,
  `dud_active_yn` VARCHAR(1) NOT NULL,
  `dud_name` VARCHAR(45) NOT NULL,
  `dud_start_time` DATETIME NOT NULL,
  `dud_end_time` DATETIME NOT NULL,
  `dud_descr` VARCHAR(45) NULL,
  `dud_active_start_date_time` DATETIME NULL,
  `dud_active_end_date_time` DATETIME NULL,
  PRIMARY KEY (`dud_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proximity_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proximity_data` (
  `pra_id` INT NOT NULL,
  `pra_prd_id` INT NOT NULL,
  `pra_tid_id` INT NOT NULL,
  `pra_dud_id` INT NOT NULL,
  PRIMARY KEY (`pra_id`, `pra_prd_id`, `pra_tid_id`, `pra_dud_id`),
  CONSTRAINT `fk_proximity_data_proximity_definitions1`
    FOREIGN KEY (`pra_prd_id`)
    REFERENCES `proximity_definitions` (`prd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proximity_data_time_definitions1`
    FOREIGN KEY (`pra_tid_id`)
    REFERENCES `time_definitions` (`tid_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proximity_data_duration_defintions1`
    FOREIGN KEY (`pra_dud_id`)
    REFERENCES `duration_defintions` (`dud_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_proximity_data_proximity_definitions1_idx` ON `proximity_data` (`pra_prd_id` ASC);

CREATE INDEX `fk_proximity_data_time_definitions1_idx` ON `proximity_data` (`pra_tid_id` ASC);

CREATE INDEX `fk_proximity_data_duration_defintions1_idx` ON `proximity_data` (`pra_dud_id` ASC);


-- -----------------------------------------------------
-- Table `detected_proximities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `detected_proximities` (
  `dep_id` INT NOT NULL,
  `dep_active_yn` VARCHAR(1) NULL,
  `dep_active_start_date` DATETIME NULL,
  `dep_active_end_time` DATETIME NULL,
  `dep_date_time` DATETIME NOT NULL,
  `dep_location` GEOMETRY NOT NULL,
  PRIMARY KEY (`dep_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

