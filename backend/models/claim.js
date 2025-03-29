const db = require('../config/database');

class Claim {
  static async validateClaimData(data) {
    const errors = [];
    
    // Bond Information Validation
    if (!data.tenantName || data.tenantName.trim().length < 2) {
      errors.push('Tenant name is required');
    }
    if (!data.mobileNo || !/^\+?[\d\s-]{10,}$/.test(data.mobileNo)) {
      errors.push('Valid mobile number is required');
    }
    if (!data.emailId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId)) {
      errors.push('Valid email ID is required');
    }
    if (!data.claimDate) {
      errors.push('Claim date is required');
    }
    if (!data.bondValue || isNaN(data.bondValue)) {
      errors.push('Valid bond value is required');
    }

    // Claim Information Validation
    if (!data.checkInDate) {
      errors.push('Check-in date is required');
    }
    if (!data.checkOutDate) {
      errors.push('Check-out date is required');
    }
    if (!data.lockInPeriod) {
      errors.push('Lock-in period is required');
    }
    if (!data.noticePeriod) {
      errors.push('Notice period is required');
    }

    return errors;
  }

  static async create(claimData) {
    const query = `
      INSERT INTO claims (
        tenant_name, mobile_no, bond_version, bond_status, claim_status,
        claim_date, landlord_name, email_id, bond_period, bond_value,
        monthly_rent, ll_period, ll_agreement, ll_expiry_date,
        check_in_date, check_out_date, stay_days, check_out_notice_date,
        lock_in_period, notice_period, breach_lock_in_days, breach_notice_days,
        actual_locking_period, actual_notice_period, move_in_video, move_out_video,
        payment_date1, amount1, upi_cheque1, bank_name1, tuesnet_ltd1,
        exp_to_h1, t_and_t1, type1, advice1,
        recovery_request_date1, recovery_amount1, recovery_upi_cheque1,
        recovery_bank_name1, recovery_tuesnet_ltd1, recovery_exp_to_h1,
        recovery_t_and_t1, recovery_type1, recovery_advice1
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `;

    const values = [
      claimData.tenantName,
      claimData.mobileNo,
      claimData.bondVersion,
      claimData.bondStatus,
      claimData.claimStatus,
      claimData.claimDate,
      claimData.landlordName,
      claimData.emailId,
      claimData.bondPeriod,
      claimData.bondValue,
      claimData.monthlyRent,
      claimData.llPeriod,
      claimData.llAgreement,
      claimData.llExpiryDate,
      claimData.checkInDate,
      claimData.checkOutDate,
      claimData.stayDays,
      claimData.checkOutNoticeDate,
      claimData.lockInPeriod,
      claimData.noticePeriod,
      claimData.breachLockInDays,
      claimData.breachNoticeDays,
      claimData.actualLockingPeriod,
      claimData.actualNoticePeriod,
      claimData.moveInVideo,
      claimData.moveOutVideo,
      claimData.paymentDate1,
      claimData.amount1,
      claimData.upiCheque1,
      claimData.bankName1,
      claimData.tuesnetLtd1,
      claimData.expToH1,
      claimData.tAndT1,
      claimData.type1,
      claimData.advice1,
      claimData.recoveryRequestDate1,
      claimData.recoveryAmount1,
      claimData.recoveryUpiCheque1,
      claimData.recoveryBankName1,
      claimData.recoveryTuesnetLtd1,
      claimData.recoveryExpToH1,
      claimData.recoveryTAndT1,
      claimData.recoveryType1,
      claimData.recoveryAdvice1
    ];

    const [result] = await db.execute(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM claims ORDER BY created_at DESC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM claims WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, claimData) {
    const query = `
      UPDATE claims SET
        tenant_name = ?, mobile_no = ?, bond_version = ?, bond_status = ?,
        claim_status = ?, claim_date = ?, landlord_name = ?, email_id = ?,
        bond_period = ?, bond_value = ?, monthly_rent = ?, ll_period = ?,
        ll_agreement = ?, ll_expiry_date = ?, check_in_date = ?, check_out_date = ?,
        stay_days = ?, check_out_notice_date = ?, lock_in_period = ?,
        notice_period = ?, breach_lock_in_days = ?, breach_notice_days = ?,
        actual_locking_period = ?, actual_notice_period = ?, move_in_video = ?,
        move_out_video = ?, payment_date1 = ?, amount1 = ?, upi_cheque1 = ?,
        bank_name1 = ?, tuesnet_ltd1 = ?, exp_to_h1 = ?, t_and_t1 = ?,
        type1 = ?, advice1 = ?, recovery_request_date1 = ?, recovery_amount1 = ?,
        recovery_upi_cheque1 = ?, recovery_bank_name1 = ?, recovery_tuesnet_ltd1 = ?,
        recovery_exp_to_h1 = ?, recovery_t_and_t1 = ?, recovery_type1 = ?,
        recovery_advice1 = ?
      WHERE id = ?
    `;

    const values = [
      claimData.tenantName,
      claimData.mobileNo,
      claimData.bondVersion,
      claimData.bondStatus,
      claimData.claimStatus,
      claimData.claimDate,
      claimData.landlordName,
      claimData.emailId,
      claimData.bondPeriod,
      claimData.bondValue,
      claimData.monthlyRent,
      claimData.llPeriod,
      claimData.llAgreement,
      claimData.llExpiryDate,
      claimData.checkInDate,
      claimData.checkOutDate,
      claimData.stayDays,
      claimData.checkOutNoticeDate,
      claimData.lockInPeriod,
      claimData.noticePeriod,
      claimData.breachLockInDays,
      claimData.breachNoticeDays,
      claimData.actualLockingPeriod,
      claimData.actualNoticePeriod,
      claimData.moveInVideo,
      claimData.moveOutVideo,
      claimData.paymentDate1,
      claimData.amount1,
      claimData.upiCheque1,
      claimData.bankName1,
      claimData.tuesnetLtd1,
      claimData.expToH1,
      claimData.tAndT1,
      claimData.type1,
      claimData.advice1,
      claimData.recoveryRequestDate1,
      claimData.recoveryAmount1,
      claimData.recoveryUpiCheque1,
      claimData.recoveryBankName1,
      claimData.recoveryTuesnetLtd1,
      claimData.recoveryExpToH1,
      claimData.recoveryTAndT1,
      claimData.recoveryType1,
      claimData.recoveryAdvice1,
      id
    ];

    const [result] = await db.execute(query, values);
    return result;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM claims WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Claim; 